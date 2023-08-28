<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StockController;
use App\Models\Report;
use App\Models\Stock;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $total_costs = Stock::sum('price');
    $total_product = Stock::count();
    $latest_stocks = Stock::latest()->with('supplier')->limit(6)->get();

    $total_reports = Report::count();

    $data['stocks'] = ['stocks' => $latest_stocks, 'total_costs' => $total_costs, 'total_product' => $total_product];
    $data['reports'] = ['total_reports' => $total_reports];

    return Inertia::render('Dashboard', compact('data'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('stocks', [StockController::class, 'initialStocks'])->name('stocks');
    Route::get('queryStocks', [StockController::class, 'queryStocks'])->name('queryStocks');
    // same but this is editable
    Route::get('management', [StockController::class, 'management'])->name('management');
    Route::delete('management/{stock}', [StockController::class, 'destroy'])->name('reduce-stock');
    Route::put('management/{stock}/update', [StockController::class, 'update'])->name('update-stock');
    Route::delete('management/{stock}/del', [StockController::class, 'deleteImmediately'])->name('delete-stock');

    Route::get('reports', [ReportController::class, 'reports'])->name('reports');
    Route::get('queryReports', [ReportController::class, 'queryReports'])->name('queryReports');

});

require __DIR__ . '/auth.php';