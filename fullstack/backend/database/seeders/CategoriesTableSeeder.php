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

        foreach (range(1, 5) as $index) {
            DB::table('categories')->insert([
                'name' => $faker->word,
                'icon' => $faker->word,
                'imagePath' => $faker->imageUrl(),
                'side' => $faker->randomElement(['left', 'right']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
