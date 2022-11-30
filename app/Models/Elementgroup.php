<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Elementgroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'tag',
        'component_id',
    ];

    public function component(){

        return $this->belongsTo(Component::class);
    }

    public function elements(){

        return $this->hasMany(Element::class);
    }
}
