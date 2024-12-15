<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'ocena',
        'komentar',
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
}
