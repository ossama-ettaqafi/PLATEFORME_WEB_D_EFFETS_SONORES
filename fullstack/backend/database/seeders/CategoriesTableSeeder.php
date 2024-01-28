<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $icons = [
            "fas fa-heart",
            "fas fa-guitar",
            "fas fa-cat",
            "fas fa-cloud",
            "fas fa-microphone",
        ];

        foreach (range(1, 5) as $index) {
            DB::table('categories')->insert([
                'name' => $faker->word,
                'icon' => $icons[$index - 1],
                'imagePath' => $faker->imageUrl(),
                'side' => $faker->randomElement(['left', 'right']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
