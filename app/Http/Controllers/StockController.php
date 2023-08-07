<?php

namespace App\Http\Controllers;

use App\Models\stock;
use App\Http\Requests\StorestockRequest;
use App\Http\Requests\UpdatestockRequest;
use Inertia\Inertia;

class StockController extends Controller
{

    public function index()
    {
        return Inertia::render('Stocks/Index');
    }
    public function store(StorestockRequest $request)
    {
        //
    }
    public function show(stock $stock)
    {
        //
    }
    public function update(UpdatestockRequest $request, stock $stock)
    {
        //
    }
    public function destroy(stock $stock)
    {
        //
    }
}