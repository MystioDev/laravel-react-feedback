<?php

namespace App\Http\Controllers;

use App\Models\feedback_models;
use Exception;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(feedback_models::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required',
                'riotId' => 'required',
                'serverTag' => 'required',
                'topic' => 'required',
                'complaint' => 'required',
            ], [
                'email.required' => 'Az e-mail cím mező kitöltése kötelező',
                'riotId.required' => 'A riot id mező kitöltése kötelező',
                'serverTag.required' => 'A szerver tag mező kitöltése kötelező',
                'topic.required' => 'A téma mező kitöltése kötelező',
                'complaint.required' => 'A panasz mező kitöltése kötelező',
            ]);
    
            $entry = new feedback_models();
            $entry->email = $request->email;
            $entry->riot_id = $request->riotId;
            $entry->server_tag = $request->serverTag;
            $entry->topic = $request->topic;
            $entry->complaint = $request->complaint;
    
            $entry->save();

            return response()->json(['message' => 'Köszönjük visszajelzésed!']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Sikertelen mentés, próbáld újra később']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
