<?php

// app/Http/Controllers/FollowController.php

namespace App\Http\Controllers;

use App\Models\Follow;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function index()
    {
        $follows = Follow::all();
        return response()->json($follows);
    }
}
