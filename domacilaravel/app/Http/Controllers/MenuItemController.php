<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuItemController extends Controller
{
    public function index()
    {
        $menuItems = MenuItem::all();

        return response()->json([
            'message' => 'Menu items retrieved successfully.',
            'data' => $menuItems,
        ]);
    }

    public function show($id)
    {
        $menuItem = MenuItem::findOrFail($id);

        return response()->json([
            'message' => 'Menu item retrieved successfully.',
            'data' => $menuItem,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string|max:1000',
            'cena' => 'required|numeric|min:0',
            'restaurant_id' => 'required|exists:restaurants,id',
            'alergeni' => 'nullable|string|max:255',
            'sastojci' => 'nullable|string|max:1000',
            'slika' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $menuItem = MenuItem::create($data);

        return response()->json([
            'message' => 'Menu item created successfully.',
            'data' => $menuItem,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string|max:1000',
            'cena' => 'required|numeric|min:0',
            'restaurant_id' => 'required|exists:restaurants,id',
            'alergeni' => 'nullable|string|max:255',
            'sastojci' => 'nullable|string|max:1000',
            'slika' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $menuItem->update($data);

        return response()->json([
            'message' => 'Menu item updated successfully.',
            'data' => $menuItem,
        ]);
    }

    public function destroy($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return response()->json([
            'message' => 'Menu item deleted successfully.',
        ]);
    }
    public function getByRestaurant($restaurantId)
    {
        $menuItems = MenuItem::where('restaurant_id', $restaurantId)->get();

        if ($menuItems->isEmpty()) {
            return response()->json([
                'message' => 'No menu items found for this restaurant.',
                'data' => [],
            ], 404);
        }

        return response()->json([
            'message' => 'Menu items retrieved successfully.',
            'data' => $menuItems,
        ]);
    }
}
