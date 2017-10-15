<?php

Route::group(['middleware' => 'web','domain' => config('app.domain_commerce'), 'namespace' => 'Modules\Graphics\Http\Controllers'], function () {
    Route::get('/', 'GraphicsController@index');
    Route::get('/contact-us', 'GraphicsController@contact_us');
    Route::get('/about-us', 'GraphicsController@aboutUs');
    Route::post('/contact_information','GraphicsController@contact_info');
    Route::get('/book/{good_id}', 'GraphicsController@book');

});


