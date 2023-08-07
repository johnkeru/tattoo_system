<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stocks = [
            1 => [
                'name' => 'Ink',
                'price' => 50
            ],
            2 => [
                'name' => 'Needle',
                'price' => 35
            ],
            3 => [
                'name' => 'Tissue',
                'price' => 150
            ],
            4 => [
                'name' => 'Tattoo Machine',
                'price' => 250
            ],
            5 => [
                'name' => 'Alcohol',
                'price' => 150
            ],
            6 => [
                'name' => 'Stencil Solution',
                'price' => 350
            ],
            7 => [
                'name' => 'Stencil Paper',
                'price' => 650
            ],
            8 => [
                'name' => 'Gloves',
                'price' => 350
            ],
            9 => [
                'name' => 'After-Care Cream',
                'price' => 50
            ],
            10 => [
                'name' => 'Anti-Bacterial',
                'price' => 450
            ],
        ];

        foreach ($stocks as $key => $value) {
            $supplier = Supplier::find($key);
            $supplier->product()->create([
                'name' => $value['name'],
                'price' => $value['price'],
                'description' => fake()->paragraph(3),
                'image' => 'https://source.unsplash.com/random/900%C3%97700/?' . $value['name']
            ]);
        }
    }
}