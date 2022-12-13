<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projectelementgroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'tag',
        'projectcomponent_id',
    ];

    public function projectcomponent(){

        return $this->belongsTo(Projectcomponent::class);
    }

    public function projectelements(){

        return $this->hasMany(Projectelement::class);
    }
}
