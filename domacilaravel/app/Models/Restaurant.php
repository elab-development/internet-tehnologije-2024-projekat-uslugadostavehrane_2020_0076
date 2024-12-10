<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv',
        'adresa',
        'telefon',
        'opis',
        'latitude',
        'longitude',
        'tip_hrane',
    ];

    /**
     * Veza sa jelima.
     */
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }

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
