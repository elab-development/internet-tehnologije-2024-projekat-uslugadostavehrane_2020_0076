<?php

use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::apiResource('restaurants', RestaurantController::class);
Route::apiResource('menu-items', MenuItemController::class);



Route::middleware('auth:sanctum')->group(function () {
    // Rute za rad sa porudžbinama
    Route::get('/orders', [OrderController::class, 'index']);          // Prikaz svih porudžbina
    Route::get('/orders/{id}', [OrderController::class, 'show']);      // Prikaz jedne porudžbine
    Route::post('/orders', [OrderController::class, 'store']);         // Kreiranje nove porudžbine
    Route::put('/orders/{id}', [OrderController::class, 'update']);    // Ažuriranje postojeće porudžbine
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']); // Brisanje porudžbine
});



Route::post('/register', [AuthController::class, 'register']); // Registracija
Route::post('/login', [AuthController::class, 'login']);       // Prijava

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // Odjava
});
