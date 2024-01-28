<?php
// app\Models\User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'image_path',
        'bio',
        'join_date',
        'country',
        'city',
    ];

}
