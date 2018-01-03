<?php

Route::group(['middleware' => 'web', 'domain' => "zgroup.{subfix}", 'namespace' => 'Modules\Elight\Http\Controllers'], function () {
    Route::get('/', 'ElightController@index');
    Route::get('/blog', 'ElightController@blog');
    Route::get('/about-us', 'ElightController@aboutUs');
    Route::get('/contact-us', 'ElightController@contactUs');
    Route::get('/all-books', 'ElightController@allBooks');
    Route::get('/blog/post/{post_id}', 'ElightController@post');
    Route::get('/sach/{book_id}', 'ElightController@book');
});