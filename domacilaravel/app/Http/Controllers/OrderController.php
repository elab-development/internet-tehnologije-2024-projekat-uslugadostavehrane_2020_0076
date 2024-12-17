<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Prikaz svih porudžbina.
     */
    public function index()
    {
        $orders = Order::with(['user', 'restaurant', 'orderItems'])->get();
        return response()->json($orders, 200);
    }

    /**
     * Prikaz jedne porudžbine.
     */
    public function show($id)
    {
        $order = Order::with(['user', 'restaurant', 'orderItems'])->findOrFail($id);
        return response()->json($order, 200);
    }

    /**
     * Kreiranje nove porudžbine.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
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

        $order = Order::create($request->only(['user_id', 'restaurant_id', 'ukupna_cena', 'status', 'datum']));

        foreach ($request->order_items as $item) {
            $order->orderItems()->create($item);
        }

        return response()->json(['message' => 'Porudžbina uspešno kreirana.', 'order' => $order], 201);
    }

    /**
     * Ažuriranje porudžbine.
     */
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
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

        $order->update($request->only(['user_id', 'restaurant_id', 'ukupna_cena', 'status', 'datum']));

        if ($request->has('order_items')) {
            $order->orderItems()->delete();
            foreach ($request->order_items as $item) {
                $order->orderItems()->create($item);
            }
        }

        return response()->json(['message' => 'Porudžbina uspešno ažurirana.', 'order' => $order], 200);
    }

    /**
     * Brisanje porudžbine.
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->orderItems()->delete();
        $order->delete();

        return response()->json(['message' => 'Porudžbina uspešno obrisana.'], 200);
    }
}
