<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'password',
        'adresa',
        'telefon',
        'latitude',
        'longitude',
        'uloga'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Veza sa porudžbinama.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Veza sa recenzijama.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
