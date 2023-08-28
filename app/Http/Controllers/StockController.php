<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Http\Requests\StorestockRequest;
use App\Http\Requests\UpdatestockRequest;
use App\Models\Report;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockController extends Controller
{

    public function initialStocks()
    {
        $initialStocks = Stock::latest()->with(['supplier'])->paginate(7);
        return Inertia::render('Stocks/Index', compact('initialStocks'));
    }
    public function queryStocks()
    {
        $currentUrl = request()->fullUrl() ?? '';
        $tab = request()->tab ?? '';
        $tabQuantity = request()->quantity ?? '';
        $search = request()->search ?? '';

        $query = Stock::query();

        if ($tabQuantity) {
            $query->where('quantity', $tabQuantity, 3);
        }

        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('item_name', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('supplier', function ($supplierQuery) use ($search) {
                        $supplierQuery->where('supplier_name', 'LIKE', '%' . $search . '%');
                    });
            });
        }

        if ($tab === 'oldest') {
            $query->oldest();
        } else {
            $query->latest();
        }

        $stocks = $query->with(['supplier'])->paginate(7);

        return response()->json(['stocks' => $stocks, 'url' => $currentUrl]);
    }



    public function management()
    {
        $initialStocks = Stock::latest()->with(['supplier'])->paginate(7);
        return Inertia::render('Management/Index', compact('initialStocks'));
    }
    public function store(StorestockRequest $request)
    {
        //
    }
    public function show(stock $stock)
    {
        //
    }
    public function update(UpdatestockRequest $request, Stock $stock)
    {
        $stock->update($request->all());
        $reportMessage = 'The stock item "' . $stock->item_name . '" has been updated.';
        Report::create([
            'report_name' => 'Stock "' . $stock->item_name . '" Updated.',
            'report_data' => json_encode(['message' => $reportMessage, 'type' => 'update']),
            'report_date' => now(),
        ]);
    }

    public function deleteImmediately(Stock $stock)
    {
        $checkStock = DB::table('stocks')->where('quantity', '>=', 1)->where('item_name', '=', $stock->item_name)->first();
        if ($checkStock) {
            $reportMessage = 'The stock item "' . $stock->item_name . '" is currently out of stock and has been removed from the inventory.';
            Report::create([
                'report_name' => 'Stock "' . $stock->item_name . '" Deleted',
                'report_data' => json_encode(['message' => $reportMessage, 'type' => 'delete']),
                'report_date' => now(),
            ]);
            DB::table('stocks')->where('id', $checkStock->id)->delete();
        }
        return redirect()->back();
    }

    public function destroy(Stock $stock)
    {
        $checkStock = DB::table('stocks')->where('quantity', '>=', 1)->where('item_name', '=', $stock->item_name)->first();
        if ($checkStock) {
            if ($checkStock->quantity === 1) {
                // report
                $reportMessage = 'The stock item "' . $stock->item_name . '" is currently out of stock and has been removed from the inventory.';
                Report::create([
                    'report_name' => 'Stock "' . $stock->item_name . '" Deleted',
                    'report_data' => json_encode(['message' => $reportMessage, 'type' => 'delete']),
                    'report_date' => now(),
                ]);
                DB::table('stocks')->where('id', $checkStock->id)->delete();
            } else {
                // report
                $newQuantity = $checkStock->quantity - 1;
                $reportMessage = 'Stock item "' . $stock->item_name . '" quantity has been updated. New Quantity: ' . $newQuantity;
                Report::create([
                    'report_name' => 'Stock Item Quantity Reduce to 1',
                    'report_data' => json_encode(['message' => $reportMessage, 'type' => 'update']),
                    'report_date' => now(),
                ]);
                DB::table('stocks')->where('id', $checkStock->id)->update([
                    'quantity' => $checkStock->quantity - 1,
                    'price' => $checkStock->price - $checkStock->original_price
                ]);
            }
        }

        return redirect()->back();
    }
}