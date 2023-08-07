<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    public function product()
    {
        return $this->hasOne(Product::class);
    }

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }
}