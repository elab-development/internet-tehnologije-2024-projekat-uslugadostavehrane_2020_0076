<?php

use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReviewController;
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



 


Route::middleware('auth:sanctum')->group(function () {
    // Rute za rad sa porudžbinama
    Route::get('/orders', [OrderController::class, 'index']);          // Prikaz svih porudžbina
    Route::get('/orders/{id}', [OrderController::class, 'show']);      // Prikaz jedne porudžbine
    Route::post('/orders', [OrderController::class, 'store']);         // Kreiranje nove porudžbine
    Route::put('/orders/{id}', [OrderController::class, 'update']);    // Ažuriranje postojeće porudžbine
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']); // Brisanje porudžbine


    Route::get('/reviews', [ReviewController::class, 'index']);          // Prikaz svih recenzija
    Route::get('/reviews/{id}', [ReviewController::class, 'show']);      // Prikaz jedne recenzije
    Route::post('/reviews', [ReviewController::class, 'store']);         // Kreiranje nove recenzije
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);    // Ažuriranje recenzije
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']); // Brisanje recenzije



    Route::apiResource('restaurants', RestaurantController::class);
    Route::apiResource('menu-items', MenuItemController::class);


    Route::post('/logout', [AuthController::class, 'logout']); // Odjava
});



Route::post('/register', [AuthController::class, 'register']); // Registracija
Route::post('/login', [AuthController::class, 'login']);       // Prijava
 