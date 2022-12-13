<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projectcomponent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'project_id',
        'component_tag',
        'description',
    ];

    public function project(){
        
        return $this->belongsTo(Project::class);
    }

    public function projectelementgroups(){

        return $this->hasMany(Projectelementgroup::class);
    }

}
