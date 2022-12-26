<?php

namespace App\Http\Controllers;

use App\Models\Projectattribute;
use App\Models\Projectelement;
use App\Models\Projectelementgroup;
use App\Models\Projectproperty;
use Illuminate\Http\Request;

class ProjectelementgroupController extends Controller
{
    public function duplicateElementgroup(Projectelementgroup $projectelementgroup){
        $name = $projectelementgroup->name;
        $tag = $projectelementgroup->tag;
        $projectcomponent = $projectelementgroup->projectcomponent;
        $elementgroup = Projectelementgroup::create([
            'name' => $name,
            'tag'  => $tag,
            'projectcomponent_id'=>$projectcomponent->id,
        ]);
        
        foreach ($projectelementgroup->projectelements as $element) {
           $tag = $element->tag;
           $content = $element->content;
           $is_parent = $element->is_parent;
           $type = $element->type;
           $projectelementgroup_id = $elementgroup->id;
           $savedelement = Projectelement::create([
            'tag' => $tag,
            'content'  => $content,
            'is_parent'=>$is_parent,
            'type'=>$type,
            'projectelementgroup_id'=>$projectelementgroup_id,
            ]);

            foreach ($element->projectattributes as $attribute) {
               $attributename = $attribute->name; 
               $value = $attribute->value; 
               $projectelement_id = $savedelement->id; 
               $savedAttributes = Projectattribute::create([
                'name' => $attributename,
                'value'  => $value,
                'projectelement_id'=>$projectelement_id,
                ]);
            }

            foreach ($element->projectproperties as $property) {
                $propertyname = $property->property; 
                $value = $property->value; 
                $projectelement_id = $savedelement->id; 
                $savedProperties = Projectproperty::create([
                 'property' => $propertyname,
                 'value'  => $value,
                 'projectelement_id'=>$projectelement_id,
                 ]);
             }
        }

        return redirect()->route("project.canvas",$projectcomponent->project)
        ->with("message","elementgroup duplicated successfully");
    }

    public function deleteElementgroup(Projectelementgroup $projectelementgroup){
      
        foreach ($projectelementgroup->projectelements as $element) {
            foreach ($element->projectattributes as $attribute) {
                $attribute->delete();
            } 
            foreach ($element->projectproperties as $property) {
                $property->delete();
            } 
            $element->delete();     
        }
        $projectelementgroup->delete();
        $projectcomponent = $projectelementgroup->projectcomponent;

        return redirect()->route("project.canvas",$projectcomponent->project)
        ->with("message","elementgroup deleted successfully");
    }
}
