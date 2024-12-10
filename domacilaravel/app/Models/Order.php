<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'ukupna_cena',
        'status',
        'datum',
    ];

    /**
     * Veza sa korisnikom.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

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
