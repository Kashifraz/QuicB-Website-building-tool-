<?php

namespace App\Http\Controllers;

use App\Models\Element;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElementController extends Controller
{
    public function store(Request $request){
        $request->validate([ 
            'tag'=>['required'],
            'type' =>['required'],
        ]);

        Element::create($request->all());

        return redirect()->route('admin.addcomponent')
            ->with('message', "element added Successfully");
    }

    public function show(Element $element){
        
        
        return Inertia::render('Admin/showElement',[
            'element' => $element,
            'attributes' => $element->attributes,
            'properties' => $element->properties,
        ]);
    }
}
