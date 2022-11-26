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

        return Inertia::render('canvas',[
            'project' => $project,
        ]);
    }

    public function generateHtml()
    {
        $tagOpen = null;
        $tagClosed = null;
        $tag = " ";
        $content = null;

        $elements = Element::where('component_id', '=', 7)->get();
        foreach ($elements as $element) {
            $tag = $element->tag;
            $attributes = null;
            foreach ($element->attributes as $attribute) {
                $attributes =  $attributes.$attribute->name." = "." '".$attribute->value."' ";
            }
    
            $tagOpen = $tagOpen. " < ".$tag." ".$attributes." >\n";
            $content = $content.$element->content."\n";
        }

        $elements = Element::where('component_id', '=', 7)->get()->sortDesc();
         foreach ($elements as $element) {
            $tag = $element->tag;
            $tagClosed = $tagClosed. " < / ".$tag." >\n";
        }
        
        echo nl2br($tagOpen);
        echo nl2br($content);
        echo nl2br($tagClosed);

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
