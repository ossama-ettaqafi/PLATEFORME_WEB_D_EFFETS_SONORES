<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class FollowsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {
            // Generate random unique follower and following IDs
            $followerId = $faker->unique()->numberBetween(1, 5);

            // Create a new instance of Faker for $followingId to avoid conflicts
            $followingIdGenerator = Faker::create();
            $followingId = $followingIdGenerator->unique()->numberBetween(1, 5);

            // Ensure that follower and following IDs are different
            while ($followerId == $followingId) {
                $followingId = $followingIdGenerator->numberBetween(1, 5);
            }

            DB::table('follows')->insert([
                'follower_id' => $followerId,
                'following_id' => $followingId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
