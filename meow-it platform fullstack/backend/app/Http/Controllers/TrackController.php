<?php
// app/Http/Controllers/TrackController.php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function index()
    {
        $tracks = Track::all();
        return response()->json($tracks);
    }
}
