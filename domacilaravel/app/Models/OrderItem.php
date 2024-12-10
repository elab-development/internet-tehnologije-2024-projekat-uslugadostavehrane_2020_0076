<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'menu_item_id',
        'kolicina',
        'cena',
    ];

    /**
     * Veza sa porudžbinom.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Veza sa jelovnikom.
     */
    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }
}
