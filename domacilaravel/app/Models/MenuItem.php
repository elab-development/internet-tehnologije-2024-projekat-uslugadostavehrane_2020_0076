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
        'alergeni', // Napomena o alergenima
        'sastojci', // Lista sastojaka
        'slika', // URL za sliku jela
    ];
}
