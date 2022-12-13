<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projectelement extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag',
        'content',
        'type',
        'is_parent',
        'projectelementgroup_id',
    ];

    public function projectelementgroup(){

        return $this->belongsTo(Elementgroup::class);
    }

    public function projectattributes(){

        return $this->hasMany(Projectattribute::class);
    }

    public function projectproperties(){

        return $this->hasMany(Projectproperty::class);
    }
}
