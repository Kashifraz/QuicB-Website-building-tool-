<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    public function store(Request $request){
    
        $request->validate([ 
            'name'=>['required','regex:/^[a-zA-Z-]+$/u','regex:/^\S*$/u','min:3','max:40'],
            'value'=>['required'],
        ]);

        Attribute::create($request->all());

        return redirect()->back()
            ->with('message', "attribute added Successfully");
    }


    public function destroy(Attribute $attribute){

        $attribute->delete();
        return redirect()->back()
        ->with("message", "attribute deleted successfully");
    }
}
