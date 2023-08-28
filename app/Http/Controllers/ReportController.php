<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function reports()
    {
        $initialReports = Report::latest()->paginate(10);
        Report::where('status', '=', 'new')->update(['status' => 'old']);
        return Inertia::render('Reports/Index', compact('initialReports'));
    }

    public function queryReports()
    {
        $currentUrl = request()->fullUrl() ?? '';
        $tab = request()->tab ?? '';
        $method = request()->method ?? '';
        $search = request()->search ?? '';

        $query = Report::query();

        if ($method) {
            $query->where('report_data->type', $method);
        }

        if ($search) {
            $query->where('report_name', 'LIKE', '%' . $search . '%');
        }

        if ($tab === 'oldest') {
            $query->oldest();
        } else {
            $query->latest();
        }

        $reports = $query->paginate(7);

        return response()->json(['reports' => $reports, 'url' => $currentUrl]);
    }
}