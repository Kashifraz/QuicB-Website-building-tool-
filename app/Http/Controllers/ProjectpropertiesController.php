<?php

namespace App\Http\Controllers;

use App\Models\Projectproperty;
use Illuminate\Http\Request;

class ProjectpropertiesController extends Controller
{
    public function customizeProperty(Request $request){
        Projectproperty::where('id', $request->id)
      ->where('property', $request->property)
      ->update(['value' => $request->value]);

      return redirect()->back();
    }
}
