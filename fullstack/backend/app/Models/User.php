<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'name', 'email', 'password', 'image_path', 'bio', 'join_date', 'country', 'city'
    ];
}
