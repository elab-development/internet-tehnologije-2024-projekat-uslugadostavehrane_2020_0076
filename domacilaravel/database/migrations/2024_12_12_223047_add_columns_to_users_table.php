<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('ime')->after('id');
            $table->string('prezime')->after('ime');
            $table->string('adresa')->nullable()->after('email');
            $table->string('telefon')->nullable()->after('adresa');
            $table->decimal('latitude', 10, 8)->nullable()->after('telefon');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->string('uloga')->default('korisnik')->after('longitude');  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'ime',
                'prezime',
                'adresa',
                'telefon',
                'latitude',
                'longitude',
                'uloga'
            ]);
        });
    }
};
