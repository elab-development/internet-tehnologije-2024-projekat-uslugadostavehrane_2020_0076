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
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->text('opis')->nullable();
            $table->decimal('cena', 8, 2);
            $table->unsignedBigInteger('restaurant_id');
            $table->text('alergije')->nullable(); 
            $table->text('sastojci')->nullable();
            $table->string('slika')->nullable();
            $table->timestamps();

            // Definisanje spoljnog ključa
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_items');
    }
};
