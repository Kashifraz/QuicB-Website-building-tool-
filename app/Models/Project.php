<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'public',
        'user_id',
    ];

    public function projectcomponents(){
        return $this->hasMany(Projectcomponent::class);
    }
}
