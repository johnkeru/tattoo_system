<?php

namespace Database\Factories;

use App\Models\Stock;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stockItems = Stock::inRandomOrder()->take(rand(1, 5))->get();
        $topSellingProducts = $stockItems->pluck('item_name')->toArray();
        return [
            'report_name' => fake()->sentence(3),
            'report_data' => json_encode([
                'total_sales' => fake()->randomNumber(5),
                'top_selling_products' => $topSellingProducts,
            ]),
            'report_date' => fake()->date('Y-m-d'),
        ];
    }
}