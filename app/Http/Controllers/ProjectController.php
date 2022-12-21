<?php

namespace App\Http\Controllers;

use App\Models\Component;
use App\Models\Element;
use App\Models\Project;
use Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function createProject(Request $request){
       
        $request->validate([
            'title' => ['required'],
            'description' => ['required'],
        ]);

        $project = Project::create($request->all());
        $projectPath = "Project_".$request->user_id."_".$project->id;
        Storage::makeDirectory("project/".$projectPath);
        Storage::makeDirectory("project/".$projectPath.'/'.'assets');

        // creating source code files
        Storage::put("project/".$projectPath."/"."index.html", "html file");
        Storage::put("project/".$projectPath."/"."styles.css", "Css file");

        return redirect()->route('project.canvas', $project->id);
    }
    
    public function getCanvas(Project $project){
        $projectComponents    = $project->projectcomponents;
        foreach ($projectComponents as $projectComponent) {
            $projectElementgroups = $projectComponent->projectelementgroups;
            foreach ($projectElementgroups as $projectElementgroup) {
                $projectElements = $projectElementgroup->projectelements;
                foreach ($projectElements as $projectElement) {
                     $projectElement->projectattributes;
                     $projectElement->projectproperties;
                }
            }
        }
        
        return Inertia::render('canvas',[
            'project'           => $project,
            // 'elements'          => $projectElements,
            'projectComponents' => $projectComponents,
            'components' =>Component::all(),
        ]);
    }

    public function generateHtml()
    {
        $componentOpen = null;
        $componentClose = null;
        $component = Component::find(23);
        $componentOpen = " <".$component->component_tag."".">";
        Storage::append('project/Project_28_9/index.html', $componentOpen);
        $elementgroupOpen = null;
        foreach ($component->elementgroups as $elementgroup) {
            $elementOpen = null;
            $elementClose = null;
            $content = null;
            $elementgroupOpen = "<".$elementgroup->tag."".">";
            Storage::append('project/Project_28_9/index.html', $elementgroupOpen);
            foreach ($elementgroup->elements as $element) {
                if(!$element->is_parent){
                    $elementOpen = $elementOpen. " <".$element->tag."".">";
                    Storage::append('project/Project_28_9/index.html', $elementOpen);
                    $content = $content.$element->content."";
                    Storage::append('project/Project_28_9/index.html', $content);
                    $elementClose = $elementClose. "</".$element->tag."".">";
                    Storage::append('project/Project_28_9/index.html', $elementClose);
                }
                
            }
          $elementgroup = " </".$elementgroup->tag."".">";
          Storage::append('project/Project_28_9/index.html', $elementgroup);
        }
        $componentClose = " </".$component->component_tag."".">";
        Storage::append('project/Project_28_9/index.html', $componentClose);
        Storage::append('project/Project_28_9/index.html', "</body>");
        Storage::append('project/Project_28_9/index.html', "</html>");

        return Storage::download('project/Project_28_9/index.html');

    }

    public function GenerateCSS(){
        
        $CSS =null;
        $elements = Element::where('component_id', '=', 7)->get();
        
        foreach ($elements as $element) {
            $properties = null;
            $selector = null;
            foreach ($element->attributes as $attribute) {
               if ($attribute->name == "class") {
                $selector = ".".$attribute->value;
               }
            }
            
            foreach ($element->properties as $property) {
                $properties =  $properties.$property->property." : ".$property->value.";\n";
            }
            
            if($selector !=null && $properties != null){
                $CSS = $selector."{"."\n".$properties."\n"."}";
            }
            
        }
        echo  nl2br($CSS);
    }
}
