<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Proverava da li je korisnik prijavljen i ima odgovarajuću ulogu
        if (!Auth::check() || Auth::user()->uloga !== $role) {
            return response()->json([
                'message' => 'Nemate pristup ovoj ruti.',
            ], 403);
        }

        return $next($request);
    }
}
