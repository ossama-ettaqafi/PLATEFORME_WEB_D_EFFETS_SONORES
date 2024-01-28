<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TracksTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {
            DB::table('tracks')->insert([
                'title' => $faker->word,
                'user_id' => $faker->numberBetween(1, 5),
                'image_path' => 'assets/images/def/track_cover.jpg',
                'duration' => $faker->numberBetween(180, 600),
                'release_date' => $faker->date,
                'category' => $faker->numberBetween(1, 5),
                'trackURL' => $faker->url . '.mp3',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
