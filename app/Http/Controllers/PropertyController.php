<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function store(Request $request){
    
        $request->validate([ 
            'property'=>['required','regex:/^\S*$/u','min:3','max:40'],
            'value'=>['required'],
        ]);

        Property::create($request->all());

        return redirect()->back()
            ->with('message', "property added Successfully");
    }

    
    public function destroy(Property $property){
        
        $property->delete();
        return redirect()->back()->with("message","property deleted successfully");
    }
}
