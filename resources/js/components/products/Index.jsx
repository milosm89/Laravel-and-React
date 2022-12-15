import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Index = () => {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const newProduct = () => {
        navigate("/product/new")
    }
    useEffect(() => {
        getProducts()
    })

    const getProducts = async () => {
        await axios.get('/api/show_product')
        .then(({data}) => {
            setProducts(data.products)
        })
    }
    return (
        <div className='container'>
            <div className="products_list">
                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Products</h1>
                    </div>
                    <div className="titlebar_item">
                        <div className="btn" onClick={() => newProduct()}>
                        Add Product
                        </div>
                    </div>
                </div>
                <div className="table">
                    <div className="list_header">
                        <p>Image</p>
                        <p>Product</p>
                        <p>Type</p>
                        <p>Inventory</p>
                        <p>Actions</p>
                    </div>
                    {
                        products.length > 0 && products.map((item, key) => (
                            <div className="list_items" key={key}>
                                <img src={`/uploadedimages/${item.photo}`} style={{height: 40}} />
                                <a>{item.name}</a>
                                <p>{item.type}</p>
                                <p>{item.price}</p>
                                <div>
                                <button className="btn-icon success">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn-icon danger">
                                    <i className="far fa-trash-alt"></i>
                                </button>
                                </div>
                            </div>
                        ))
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default Index