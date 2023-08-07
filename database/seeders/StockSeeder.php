<?php

namespace Database\Seeders;

use App\Models\Stock;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = Supplier::with('product')->get();
        foreach ($suppliers as $supply) {
            $supply->stock()->create([
                'item_name' => $supply->product->name,
                'quantity' => 1,
                'image' => $supply->product->image,
                'price' => $supply->product->price,
                'reorder_point' => 3,
                'reorder_quantity' => 10,
                'user_id' => 1
            ]);
        }

        // repeat the process 3 times to make quantity higher than 'reorder_point' to avoid the notification when the 'reoder_point' is lower than 3.
        foreach ($suppliers as $supply) {
            $stock = Stock::where('supplier_id', '=', $supply->id)->first();
            $stock->update([
                'quantity' => $stock->quantity + 1,
                'price' => $stock->price + $stock->price,
            ]);
        }
        foreach ($suppliers as $supply) {
            $stock = Stock::where('supplier_id', '=', $supply->id)->first();
            $stock->update([
                'quantity' => $stock->quantity + 1,
                'price' => $stock->price + $stock->price,
            ]);
        }
        foreach ($suppliers as $supply) {
            $stock = Stock::where('supplier_id', '=', $supply->id)->first();
            $stock->update([
                'quantity' => $stock->quantity + 1,
                'price' => $stock->price + $stock->price,
            ]);
        }
    }
}