<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class NotificationsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {
            DB::table('notifications')->insert([
                'user_id' => $faker->numberBetween(1, 5),
                'notification_type' => $faker->numberBetween(1, 2),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
