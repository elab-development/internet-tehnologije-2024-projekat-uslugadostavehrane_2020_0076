<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::all();

        return response()->json([
            'message' => 'Restaurants retrieved successfully.',
            'data' => $restaurants,
        ]);
    }

    public function show($id)
    {
        $restaurant = Restaurant::findOrFail($id);

        return response()->json([
            'message' => 'Restaurant retrieved successfully.',
            'data' => $restaurant,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'adresa' => 'required|string|max:255',
            'telefon' => 'required|string|max:20',
            'opis' => 'nullable|string|max:1000',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'tip_hrane' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        // // Ako postoji ulogovani korisnik
        // if ($request->user()) {
        //     $data['user_id'] = $request->user()->id;
        // }

        $restaurant = Restaurant::create($data);

        return response()->json([
            'message' => 'Restaurant created successfully.',
            'data' => $restaurant,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'adresa' => 'required|string|max:255',
            'telefon' => 'required|string|max:20',
            'opis' => 'nullable|string|max:1000',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'tip_hrane' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $restaurant->update($data);

        return response()->json([
            'message' => 'Restaurant updated successfully.',
            'data' => $restaurant,
        ]);
    }

    public function destroy($id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();

        return response()->json([
            'message' => 'Restaurant deleted successfully.',
        ]);
    }
}
