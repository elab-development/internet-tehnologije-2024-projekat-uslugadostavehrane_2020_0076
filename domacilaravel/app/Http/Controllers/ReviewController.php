<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Prikaz svih recenzija.
     */
    public function index()
    {
        $reviews = Review::where('user_id', Auth::id())->get();
        return response()->json($reviews, 200);
    }

    /**
     * Prikaz jedne recenzije.
     */
    public function show($id)
    {
        $review = Review::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($review, 200);
    }

    /**
     * Kreiranje nove recenzije.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'required|exists:restaurants,id',
            'ocena' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review = Review::create([
            'user_id' => Auth::id(),
            'restaurant_id' => $request->restaurant_id,
            'ocena' => $request->ocena,
            'komentar' => $request->komentar,
        ]);

        return response()->json(['message' => 'Recenzija uspešno kreirana.', 'review' => $review], 201);
    }

    /**
     * Ažuriranje postojeće recenzije.
     */
    public function update(Request $request, $id)
    {
        $review = Review::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'required|exists:restaurants,id',
            'ocena' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $review->update($request->only(['restaurant_id', 'ocena', 'komentar']));

        return response()->json(['message' => 'Recenzija uspešno ažurirana.', 'review' => $review], 200);
    }

    /**
     * Brisanje recenzije.
     */
    public function destroy($id)
    {
        $review = Review::where('user_id', Auth::id())->findOrFail($id);
        $review->delete();

        return response()->json(['message' => 'Recenzija uspešno obrisana.'], 200);
    }
}
