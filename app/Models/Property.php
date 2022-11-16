<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'property','value','element_id'
    ];

    public function element(){

        return $this->belongsTo(Element::class);
    }
}
