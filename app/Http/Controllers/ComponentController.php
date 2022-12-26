<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Component;
use App\Models\Element;
use App\Models\Elementgroup;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentController extends Controller
{
    public function index()
    {
        $Components = Component::with('elementgroups')->get();

        return Inertia::render('Admin/addComponent', [
            'components' => $Components,
        ]);
    }

    public function createComponent(Request $request)
    {

        $request->validate([
            'name' => ['required','regex:/^[a-zA-Z-]+$/u','min:3','max:40'],
            'component_tag' => ['required','regex:/^[a-zA-Z-]+$/u'],
            'description' => ['required','min:20', 'max:150'],
        ]);

        Component::create($request->all());

        return redirect()->route('admin.addcomponent')
            ->with('message', "component added Successfully");
    }

    public function show(Component $component)
    {
        //$Elementgroups = $component->elementgroups;
        $Elementgroups = Elementgroup::with('elements')
            ->where("component_id", "=", $component->id)->get();
        return Inertia::render('Admin/AddElementgroup', [
            "component" => $component,
            "Elementgroups" => $Elementgroups,
        ]);
    }


    public function destroy(Component $component)
    {

        $elementgroups = $component->elementgroups;
        foreach ($elementgroups as $elementgroup) {
            $elements = $elementgroup->elements;
            foreach ($elements as $element) {
                Attribute::where("element_id", "=", $element->id)->delete();
                Property::where("element_id", "=", $element->id)->delete();
                $element->delete();
            }

            $elementgroup->delete();
        }

        $component->delete();
        return redirect()->back()
            ->with('message', 'component deleted successfully');
    }
}
