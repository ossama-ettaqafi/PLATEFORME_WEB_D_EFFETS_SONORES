<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(TracksTableSeeder::class);
        $this->call(FollowsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(NotificationsTableSeeder::class);
        $this->call(LikesTableSeeder::class);
    }
}
