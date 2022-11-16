<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Element extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'tag',
        'content',
        'type',
        'parent_id',
        'component_id',
    ];

    public function component(){

        return $this->belongsTo(Component::class);
    }

    public function attributes(){

        return $this->hasMany(Attribute::class);
    }

    public function properties(){

        return $this->hasMany(Property::class);
    }
}
