<?php

use App\Http\Controllers\FeedbackController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api');

Route::get('/feedbacks', [FeedbackController::class, 'index']);