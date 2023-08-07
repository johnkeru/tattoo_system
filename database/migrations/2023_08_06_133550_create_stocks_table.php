<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('item_name'); // The name of the tattoo supply item.
            $table->integer('quantity'); // The current quantity of the item in stock.
            $table->integer('price'); // The price of the item.
            $table->integer('reorder_point'); // The minimum quantity at which the item needs to be reordered.
            $table->integer('reorder_quantity'); // The quantity to be reordered when the stock reaches the reorder point.
            $table->foreignId('supplier_id')->constrained('suppliers'); // A foreign key referencing the "Suppliers" table, indicating the supplier of the item.
            $table->foreignId('user_id')->constrained('users'); // A foreign key referencing the "Suppliers" table, indicating the supplier of the item.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};