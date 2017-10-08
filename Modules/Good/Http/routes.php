<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'good', 'namespace' => 'Modules\Good\Http\Controllers'], function () {
    Route::get('/all', 'GoodController@getAll');
    Route::post("/create","GoodController@createGood");
    Route::get("/all-property-items", 'GoodController@allPropertyItems');
    Route::post("/delete-property-item/{property_item_id}", 'GoodController@deletePropertyItem');
    Route::get("/{id}","GoodController@good");
    Route::post("/create-property-item", 'GoodController@createGoodPropertyItem');
});
