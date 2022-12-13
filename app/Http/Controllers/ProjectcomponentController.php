<?php

namespace App\Http\Controllers;

use App\Models\Component;
use App\Models\Projectattribute;
use App\Models\Projectcomponent;
use App\Models\Projectelement;
use App\Models\Projectelementgroup;
use App\Models\Projectproperty;
use Illuminate\Http\Request;

class ProjectcomponentController extends Controller
{
    public function copyComponent(Request $request)
    {
        $id = $request->component_id;
        $project_id = $request->project_id;
        $selectedComponent = Component::find($id);
        $projectComponent = Projectcomponent::create([
            'name'          => $selectedComponent->name,
            'project_id'    => $project_id,
            'component_tag' => $selectedComponent->component_tag,
            'description'   => $selectedComponent->description,
        ]);

        foreach ($selectedComponent->elementgroups as $elementgroup) {
            $projectElementgroup = Projectelementgroup::create([
                'name'          => $elementgroup->name,
                'tag'           => $elementgroup->tag,
                'projectcomponent_id'  => $projectComponent->id,
            ]);
            
            foreach ($elementgroup->elements as $element) {
                $projectElement = Projectelement::create([
                    'tag'                    => $element->tag,
                    'content'                => $element->content,
                    'is_parent'              => $element->is_parent,
                    'type'                   => $element->type,
                    'projectelementgroup_id' => $projectElementgroup->id,
                ]);

                foreach ($element->attributes as $attribute) {
                    $projectAttribute = Projectattribute::create([
                        'name'              => $attribute->name,
                        'value'             => $attribute->value,
                        'projectelement_id' => $projectElement->id,
                    ]);
                }

                foreach ($element->properties as $properties) {
                    $projectProperties = Projectproperty::create([
                        'property'          => $properties->property,
                        'value'             => $properties->value,
                        'projectelement_id' => $projectElement->id,
                    ]);
                }
            }
        }
        return redirect()->route('project.canvas', $project_id)
            ->with('message', 'component added to project');
    }

    public function submitCustomization(Request $request){

        return $request;
    }
}
