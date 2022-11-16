<?php

namespace App\Http\Controllers;

use App\Models\Component;
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
}
