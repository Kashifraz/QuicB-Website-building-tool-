<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Component;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentController extends Controller
{
    public function index(){
        $Components = Component::with('elements')->get();
   
        return Inertia::render('Admin/addComponent',[
            'components'=>$Components,
        ]);
    }

    public function createComponent(Request $request){

        $request->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);
        
        Component::create($request->all());

        return redirect()->route('admin.addcomponent')
            ->with('message', "component added Successfully");
    }


    public function destroy(Component $component){

        $elements = $component->elements;
        foreach ($elements as $element) {
            Attribute::where("element_id","=", $element->id)->delete();
            Property::where("element_id","=", $element->id)->delete();
            $element->delete();
        }

        $component->delete();
        return redirect()->back()
        ->with('message','component deleted successfully');
    }
}
