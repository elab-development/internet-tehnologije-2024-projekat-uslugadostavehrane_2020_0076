<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv',
        'opis',
        'cena',
        'restaurant_id',
        'alergeni',
        'sastojci',
        'slika',
    ];

    /**
     * Veza sa restoranom.
     */
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Veza sa stavkama porudžbine.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
