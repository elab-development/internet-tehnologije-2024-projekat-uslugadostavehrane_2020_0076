<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Dodavanje korisnika
        DB::table('users')->insert([
            [
                'ime' => 'Petar',
                'prezime' => 'Petrović',
                'email' => 'petar@example.com',
                'password' => Hash::make('password123'),
                'adresa' => 'Ulica 1, Beograd',
                'telefon' => '0601234567',
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'uloga' => 'admin',
            ],
            [
                'ime' => 'Ana',
                'prezime' => 'Anić',
                'email' => 'ana@example.com',
                'password' => Hash::make('password123'),
                'adresa' => 'Ulica 2, Novi Sad',
                'telefon' => '0612345678',
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'uloga' => 'user',
            ],
        ]);

        // Dodavanje restorana
        DB::table('restaurants')->insert([
            [
                'naziv' => 'Restoran Medeni Zalogaj',
                'adresa' => 'Ulica 3, Beograd',
                'telefon' => '0623456789',
                'opis' => 'Restoran sa mediteranskom hranom i specijalitetima.',
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'tip_hrane' => 'Mediteranska',
            ],
            [
                'naziv' => 'Picerija Pica Mesto',
                'adresa' => 'Ulica 4, Novi Sad',
                'telefon' => '0634567890',
                'opis' => 'Autentična italijanska picerija.',
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'tip_hrane' => 'Italijanska',
            ],
        ]);

        // Dodavanje stavki iz jelovnika
        DB::table('menu_items')->insert([
            [
                'naziv' => 'Pica Margarita',
                'opis' => 'Tradicionalna italijanska pica sa sirom i paradajzom.',
                'cena' => 900.00,
                'restaurant_id' => 1,
                'alergeni' => 'Gluten, Laktoza',
                'sastojci' => 'Paradajz, Mocarela, Bosiljak',
                'slika' => 'pica_margarita.jpg',
            ],
            [
                'naziv' => 'Medeni Losos',
                'opis' => 'Losos glaziran medom sa prilogom od povrća.',
                'cena' => 1500.00,
                'restaurant_id' => 1,
                'alergeni' => 'Riba',
                'sastojci' => 'Losos, Med, Povrće',
                'slika' => 'medeni_losos.jpg',
            ],
        ]);

        // Dodavanje porudžbina
        DB::table('orders')->insert([
            [
                'user_id' => 2,
                'restaurant_id' => 1,
                'ukupna_cena' => 2400.00,
                'status' => 'completed',
                'datum' => $faker->dateTimeBetween('-1 month', 'now'),
            ],
            [
                'user_id' => 2,
                'restaurant_id' => 2,
                'ukupna_cena' => 900.00,
                'status' => 'pending',
                'datum' => $faker->dateTimeBetween('-1 week', 'now'),
            ],
        ]);

        // Dodavanje stavki porudžbine
        DB::table('order_items')->insert([
            [
                'order_id' => 1,
                'menu_item_id' => 1,
                'kolicina' => 2,
                'cena' => 1800.00,
            ],
            [
                'order_id' => 2,
                'menu_item_id' => 2,
                'kolicina' => 1,
                'cena' => 900.00,
            ],
        ]);

        // Dodavanje recenzija
        DB::table('reviews')->insert([
            [
                'user_id' => 2,
                'restaurant_id' => 1,
                'ocena' => 5,
                'komentar' => 'Odlična hrana, preporučujem!',
            ],
            [
                'user_id' => 2,
                'restaurant_id' => 2,
                'ocena' => 4,
                'komentar' => 'Pica je bila ukusna, ali mogla je biti toplija.',
            ],
        ]);
    }
}
