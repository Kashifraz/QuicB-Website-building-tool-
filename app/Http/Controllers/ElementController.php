<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Element;
use App\Models\Property;
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

        return redirect()->back()
            ->with('message', "element added Successfully");
    }



    public function show(Element $element){
        
        return Inertia::render('Admin/showElement',[
            'element' => $element,
            'attributes' => $element->attributes,
            'properties' => $element->properties,
        ]);
    }


    public function destroy(Element $element){
       Attribute::where("element_id","=", $element->id)->delete();
       Property::where("element_id","=", $element->id)->delete();
       $element->delete();
       return redirect()->back()
       ->with("message","element deleted successfully");
    }
}
