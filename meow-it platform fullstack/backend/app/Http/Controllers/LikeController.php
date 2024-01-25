<?php

// app/Http/Controllers/LikeController.php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index()
    {
        $likes = Like::all();
        return response()->json($likes);
    }
}
