<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function add_product(Request $request) {

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
            if ($request->file('photo')) {
                $uploadedFile = $request->file('photo');
                
                if ($uploadedFile) {
                    $filename = Str::uuid() . '.' . $uploadedFile->getClientOriginalExtension();
                    Storage::disk('public')->putFileAs('uploadedFiles/', $uploadedFile, $filename);
                    $product->photo = $filename;
                }
            }else {
                $product->photo = "image.png";
            }
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
    }
}
