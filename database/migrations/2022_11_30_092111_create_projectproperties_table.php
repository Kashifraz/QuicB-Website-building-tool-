<?php

use App\Models\Projectelement;
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
        Schema::create('projectproperties', function (Blueprint $table) {
            $table->id();
            $table->string('property');
            $table->string('value');
            $table->foreignIdFor(Projectelement::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projectproperties');
    }
};
