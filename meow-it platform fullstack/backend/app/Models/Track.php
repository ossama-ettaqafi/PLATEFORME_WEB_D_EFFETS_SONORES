<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = [
        'title', 'user_id', 'image_path', 'duration', 'release_date', 'category', 'trackURL',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
