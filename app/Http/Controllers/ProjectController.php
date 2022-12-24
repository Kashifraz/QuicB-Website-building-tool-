<?php

namespace App\Http\Controllers;

use App\Models\Component;
use App\Models\Element;
use App\Models\Project;
use App\Models\Projectattribute;
use App\Models\Projectproperty;
use Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function createProject(Request $request)
    {

        $request->validate([
            'title' => ['required'],
            'description' => ['required'],
        ]);

        $project = Project::create($request->all());
        $projectPath = "Project_" . $request->user_id . "_" . $project->id;
        Storage::makeDirectory("public/project/" . $projectPath);
        // Storage::makeDirectory("public/project/" . $projectPath . '/' . 'assets');

        // creating source code files
        Storage::put("public/project/" . $projectPath . "/" . "index.html", "html file");
        // Storage::put("public/project/" . $projectPath . "/" . "styles.css", "Css file");

        return redirect()->route('project.canvas', $project->id);
    }

    public function getCanvas(Project $project)
    {
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

        $ShareLink = url("project/share/" . $project->id);
        return Inertia::render('canvas', [
            'project'           => $project,
            'projectComponents' => $projectComponents,
            'components' => Component::all(),
            'link' => $ShareLink,
        ]);
    }

    public function saveProject(Project $project)
    {
        $path = "public/project/Project_" . $project->user_id . "_" . $project->id . "/index.html";
        $concatPath = Storage::path($path);
        //clearing previous content in the file
        $fh = fopen($concatPath, 'w');
        $projectCSS = $this->GenerateCSS($project);
        $headerCode =
'<!DOCTYPE html>
<html>
<head>
<title>'.$project->title.'</title>
<style>
'.$projectCSS.'
</style>
</head>
<body>
';
        //adding html and body tags
        Storage::append($path, $headerCode);
        $this->generateHtml($project);
        return redirect()->route("project.canvas",$project->id)
        ->with("message","project save successfully");
        
    }

    public function downloadCode(Project $project){
        $path = "public/project/Project_" . $project->user_id . "_" . $project->id . "/index.html";
        $downloadPath = Storage::path($path);
        return response()->download($downloadPath);
    }

    public function generateHtml(Project $project) {
        $componentOpen = null;
        $componentClose = null;
        $path = "public/project/Project_" . $project->user_id . "_" . $project->id . "/index.html";
        $concatPath = Storage::path($path);
    
        foreach ($project->projectcomponents as $component) {
            //appending container to HTML file
            $container = " <div " . "id= 'container_" . $component->name . "' >";
            Storage::append($path, $container);
            //appending component tag
            $componentOpen = " <" . $component->component_tag . " class = '" . $component->name . "' >";
            Storage::append($path, $componentOpen);
            $elementgroupOpen = null;
            foreach ($component->projectelementgroups as $elementgroup) {
                $elementOpen = null;
                $elementClose = null;
                $content = null;
                //appending elementgroup tag
                $elementgroupOpen = "<" . $elementgroup->tag . " class = '" . $elementgroup->name . "' >";
                Storage::append($path, $elementgroupOpen);
                foreach ($elementgroup->projectelements as $element) {
                    $attributes = null;
                    if (!$element->is_parent) {
                        foreach ($element->projectattributes as $attribute) {
                            $attributes = $attributes . $attribute->name . ' = "' . $attribute->value . '" ';
                        }
                        $elementOpen =  " <" . $element->tag . " " . $attributes . " >";
                        Storage::append($path, $elementOpen);
                        $content = $element->content . "";
                        Storage::append($path, $content);
                        $elementClose = "</" . $element->tag . "" . ">";
                        Storage::append($path, $elementClose);
                    }
                }
                $elementgroup = " </" . $elementgroup->tag . "" . ">";
                Storage::append($path, $elementgroup);
            }
            $componentClose = " </" . $component->component_tag . "" . ">";
            Storage::append($path, $componentClose);
            //appending container to HTML file
            $container = " </div>";
            Storage::append($path, $container);
        }

        Storage::append($path, "</body>");
        Storage::append($path, "</html>");
    }


    public function GenerateCSS(Project $project){
        $CSS = null;
        // $elements = Element::where('component_id', '=', 7)->get();
        foreach ($project->projectcomponents as $component) {
            foreach ($component->projectelementgroups as $elementgroups) {
                foreach ($elementgroups->projectelements as $element) {
                    $properties = null;
                    $selector = null;
                    foreach ($element->projectattributes as $attribute) {
                        if ($attribute->name == "class") {
                            $selector = "." . $attribute->value;
                        }
                    }

                    foreach ($element->projectproperties as $property) {
                        $properties =  $properties . $property->property . " : " . $property->value . ";";
                    }

                    if ($selector != null && $properties != null) {
                        $CSS = $CSS . $selector . "{" . " " . $properties . "}";
                    }
                }
            }
        }


        return nl2br($CSS);
    }

    public function previewProject(Project $project)
    {
        if (Auth::user()->id == $project->user_id) {
            $path = "public/project/Project_" . $project->user_id . "_" . $project->id . "/index.html";
            $concatPath = Storage::path($path);
            return response()->file($concatPath);
        } else {
            echo "you are not allowed to access";
        }
    }

    public function shareProject(Project $project)
    {
        if ($project->public) {
            $path = "public/project/Project_" . $project->user_id . "_" . $project->id . "/index.html";
            $concatPath = Storage::path($path);
            return response()->file($concatPath);
        } else {
            echo "you are not allowed to access";
        }
    }

    public function deleteProject(Project $project)
    {

        foreach ($project->projectcomponents as $component) {
            foreach ($component->projectelementgroups as $elementgroup) {
                foreach ($elementgroup->projectelements as $element) {
                    Projectattribute::where("projectelement_id", "=", $element->id)->delete();
                    Projectproperty::where("projectelement_id", "=", $element->id)->delete();
                    $element->delete();
                }
                $elementgroup->delete();
            }
            $component->delete();
        }
        $project->delete();
        $projectPath = "Project_" . $project->user_id . "_" . $project->id;
        Storage::deleteDirectory("public/project/" . $projectPath);
        return redirect()->route('dashboard')
            ->with('message', 'component deleted successfully');
    }
}
