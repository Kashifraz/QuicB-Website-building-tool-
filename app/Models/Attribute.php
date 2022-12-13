<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'value',
        'element_id'
    ];

    public function element(){

        return $this->belongsTo(Element::class);
    }
}
