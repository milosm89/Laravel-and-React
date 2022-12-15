<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function show_product() {
        $products = Product::all();
        return response()->json([
            'products' => $products
        ],200);
    }
    public function add_product(Request $request) {

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
            if ($request->file('photo')) {
                $uploadedFile = $request->file('photo');
                
                if ($uploadedFile) {
                    $filename = time() . '.' . $uploadedFile->getClientOriginalExtension();
                    $request->file('photo')->move(public_path('/uploadedimages'), $filename);
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

    public function get_edit_product($id) {
        
        $product = Product::find($id);
        return response()->json([
            'product' => $product
        ],200);
    }

    public function update_product(Request $request, $id) {

        $product = Product::find($id);
        $product->name = $request->name;
        $product->description = $request->description;
            if ($product->photo != $request->file('photo')) {
                $uploadedFile = $request->file('photo');
                
                if ($uploadedFile) {
                    $filename = time() . '.' . $uploadedFile->getClientOriginalExtension();
                    $request->file('photo')->move(public_path('/uploadedimages'), $filename);
                    $product->photo = $filename;
                }
            }else {
                $product->photo = $product->photo;
            }
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
    }
}
