<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
class OrderController extends Controller
{
    /**
     * Prikaz svih porudžbina za ulogovanog korisnika.
     */
    public function index()
    {
        $userId = auth()->id(); // Dohvatanje ID-a ulogovanog korisnika
        $orders = Order::with(['restaurant', 'orderItems'])
            ->where('user_id', $userId)
            ->get();

        return response()->json($orders, 200);
    }

    /**
     * Prikaz jedne porudžbine za ulogovanog korisnika.
     */
    public function show($id)
    {
        $userId = auth()->id(); // Dohvatanje ID-a ulogovanog korisnika
        $order = Order::with(['restaurant', 'orderItems'])
            ->where('user_id', $userId)
            ->findOrFail($id);

        return response()->json($order, 200);
    }

    /**
     * Kreiranje nove porudžbine za ulogovanog korisnika.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'required|exists:restaurants,id',
            'ukupna_cena' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
            'datum' => 'required|date',
            'order_items' => 'required|array',
            'order_items.*.menu_item_id' => 'required|exists:menu_items,id',
            'order_items.*.kolicina' => 'required|integer|min:1',
            'order_items.*.cena' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Automatski uzimamo ID ulogovanog korisnika
        $userId = auth()->id();

        // Konvertovanje datuma u format "Y-m-d H:i:s"
        $formattedDate = Carbon::parse($request->datum)->format('Y-m-d H:i:s');


        // Kreiramo porudžbinu
        $order = Order::create([
            'user_id' => $userId,
            'restaurant_id' => $request->restaurant_id,
            'ukupna_cena' => $request->ukupna_cena,
            'status' => $request->status,
            'datum' => $formattedDate,
        ]);

        // Kreiramo stavke porudžbine
        foreach ($request->order_items as $item) {
            $order->orderItems()->create($item);
        }

        return response()->json(['message' => 'Porudžbina uspešno kreirana.', 'order' => $order], 201);
    }

    /**
     * Ažuriranje porudžbine (samo za ulogovanog korisnika).
     */
    public function update(Request $request, $id)
    {
        $userId = auth()->id();

        $order = Order::where('user_id', $userId)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'required|exists:restaurants,id',
            'ukupna_cena' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
            'datum' => 'required|date',
            'order_items' => 'nullable|array',
            'order_items.*.menu_item_id' => 'required|exists:menu_items,id',
            'order_items.*.kolicina' => 'required|integer|min:1',
            'order_items.*.cena' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order->update([
            'restaurant_id' => $request->restaurant_id,
            'ukupna_cena' => $request->ukupna_cena,
            'status' => $request->status,
            'datum' => $request->datum,
        ]);

        if ($request->has('order_items')) {
            $order->orderItems()->delete();
            foreach ($request->order_items as $item) {
                $order->orderItems()->create($item);
            }
        }

        return response()->json(['message' => 'Porudžbina uspešno ažurirana.', 'order' => $order], 200);
    }

    /**
     * Brisanje porudžbine (samo za ulogovanog korisnika).
     */
    public function destroy($id)
    {
        $userId = auth()->id();

        $order = Order::where('user_id', $userId)->findOrFail($id);
        $order->orderItems()->delete();
        $order->delete();

        return response()->json(['message' => 'Porudžbina uspešno obrisana.'], 200);
    }
}
