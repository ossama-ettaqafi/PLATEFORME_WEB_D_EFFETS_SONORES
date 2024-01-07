<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowsTable extends Migration
{
    public function up()
    {
        Schema::create('follows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('follower_id')->constrained('users'); // Foreign key to users table
            $table->foreignId('following_id')->constrained('users'); // Foreign key to users table
            $table->timestamps(); // Created at and Updated at timestamps

            $table->unique(['follower_id', 'following_id']); // Ensure uniqueness
        });
    }

    public function down()
    {
        Schema::dropIfExists('follows');
    }
}
