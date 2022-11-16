<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    public function store(Request $request){
    
        $request->validate([ 
            'name'=>['required'],
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
