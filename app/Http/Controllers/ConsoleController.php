<?php

namespace App\Http\Controllers;

use App\Models\Console;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsoleController extends Controller
{
    public function index()
    {
        $consoles = Console::latest()->paginate(5);
        return Inertia::render('Consoles', [
            'consoles' => $consoles,
            'currentPage' => $consoles->currentPage(),
            'perPage' => $consoles->perPage()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'model' => 'required',
            'price' => 'required'
        ]);

        Console::create($data);

        return back()->with('message', 'Console successfully added');
    }

    public function update(Console $console, Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'model' => 'required',
            'price' => 'required'
        ]);

        $console->update($data);

        return back()->with('message', 'Console successfully updated');
    }

    public function destroy(Console $console)
    {
        $console->delete();

        return back()->with('message', 'Console successfully deleted');
    }
}
