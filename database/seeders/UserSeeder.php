<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->data() as $value) {
            User::create($value);
        }
    }

    private function data()
    {
        return [
            [
                'name' => fake()->name(),
                'email' => 'admin@gmail.com',
                'role' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('admin'),
                'remember_token' => Str::random(10),
            ],
            [
                'name' => fake()->name(),
                'email' => 'admin2@gmail.com',
                'role' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('admin2'),
                'remember_token' => Str::random(10),
            ],
            [
                'name' => fake()->name(),
                'email' => 'admin3@gmail.com',
                'role' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('admin3'),
                'remember_token' => Str::random(10),
            ],
        ];
    }
}