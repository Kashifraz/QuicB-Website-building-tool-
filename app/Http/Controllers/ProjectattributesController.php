<?php

namespace App\Http\Controllers;

use App\Models\Projectattribute;
use Illuminate\Http\Request;

class ProjectattributesController extends Controller
{
    public function customizeAttribute(Request $request){
        Projectattribute::where('id', $request->id)
      ->where('name', $request->name)
      ->update(['value' => $request->value]);

      return redirect()->back();
    }
}
