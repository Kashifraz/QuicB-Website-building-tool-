<?php

namespace App\Http\Controllers;

use App\Models\Projectelement;
use Illuminate\Http\Request;

class ProjectelementController extends Controller
{
    public function customizeElement(Request $request){
        Projectelement::where('id', $request->id)
      ->update(['content' => $request->content]);

      return redirect()->back();
    }  
}
