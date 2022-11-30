<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Elementgroup;
use App\Models\Property;
use Illuminate\Http\Request;

class ElementgroupController extends Controller
{
    public function store(Request $request){
        
        $request->validate([
            'name' => ['required'],
            'tag'  => ['required'],
        ]);

        Elementgroup::create($request->all());

        return redirect()->back()
        ->with('message','Element group added successfully');
    }

    public function destroy(Elementgroup $elementgroup){

        $elements = $elementgroup->elements;
        foreach ($elements as $element) {
            Attribute::where("element_id","=", $element->id)->delete();
            Property::where("element_id","=", $element->id)->delete();
            $element->delete();
        }

        $elementgroup->delete();
        return redirect()->back()
        ->with('message','Element Group deleted deleted successfully');
    }

  
}
