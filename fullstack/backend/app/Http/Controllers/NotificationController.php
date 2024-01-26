<?php

// app/Http/Controllers/NotificationController.php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::all();
        return response()->json($notifications);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'notification_type' => 'required|integer',
        ]);

        // Create a new notification with the validated data
        $notification = Notification::create($validatedData);

        // You can customize the response as needed
        return response()->json(['message' => 'Notification created successfully', 'notification' => $notification], 201);
    }
}
