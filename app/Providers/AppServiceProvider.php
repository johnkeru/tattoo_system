<?php

namespace App\Providers;

use App\Models\Report;
use App\Models\Stock;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $manage_badge = Stock::where('quantity', '<=', 3)->count();
        $reports_badge = Report::where('status', '=', 'new')->count();

        $manage_badge = $manage_badge > 9 ? '9+' : $manage_badge;
        $reports_badge = $reports_badge > 9 ? '9+' : $reports_badge;
        Inertia::share(compact('manage_badge', 'reports_badge'));
    }
}