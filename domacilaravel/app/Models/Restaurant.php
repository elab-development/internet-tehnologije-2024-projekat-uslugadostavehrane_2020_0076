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
        'latitude', // Dodato polje za širinu
        'longitude', // Dodato polje za dužinu
        'tip_hrane', // Dodato polje za tip hrane
    ];
}
