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
            'sender_id' => 'required|exists:users,id',
            'notification_type' => 'required|integer',
        ]);

        // Create a new notification with the validated data
        $notification = Notification::create($validatedData);

        // You can customize the response as needed
        return response()->json(['message' => 'Notification created successfully', 'notification' => $notification], 201);
    }


    public function destroy(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'sender_id' => 'required|exists:users,id',
            'notification_type' => 'required|integer',
        ]);

        // Find the notification based on the provided criteria
        $notification = Notification::where('user_id', $validatedData['user_id'])
            ->where('sender_id', $validatedData['sender_id'])
            ->where('notification_type', $validatedData['notification_type'])
            ->first();

        // Check if the notification exists
        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        // Delete the notification
        $notification->delete();

        // You can customize the response as needed
        return response()->json(['message' => 'Notification deleted successfully']);
    }
}
