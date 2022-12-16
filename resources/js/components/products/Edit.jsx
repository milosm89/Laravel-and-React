import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
    const navigate = useNavigate()

    const {id} = useParams()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [type, setType] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [avatar, setAvatar] = useState(true)

    useEffect(() => {
        getProduct()
    },[])

    const getProduct = async () => {
        await axios.get(`/api/get_edit_product/${id}`)
            .then(({data}) =>{
                const {name, description, photo, type, quantity, price} = data.product
                setName(name)
                setDescription(description)
                setPhoto(photo)
                setType(type)
                setQuantity(quantity)
                setPrice(price)
            })
            .catch(({response:{data}})=>{

            })
    }

    const ourImage = (img) => {
        return '/uploadedimages/'+img
    }

    const handleFileSelect = (event) => {
        var file = event.target.files[0];
        var limit = 1024*1024*2
        if (file['size'] > limit) {
            alert("File Uploaded is big");
        }else {
            var reader = new FileReader();
            setAvatar(false)
            reader.onloadend = function (e) {
                setPreview(reader.result)
            }
        }
        var url = reader.readAsDataURL(file);
        setPhoto(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('name', name)
        formData.append('description', description)
        formData.append('photo', photo)
        formData.append('type', type)
        formData.append('quantity', quantity)
        formData.append('price', price)

        try {
            const response = await axios.post(`/api/update_product/${id}`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            }).then((res) => {
                alert("File Updated Successfully");
            }).catch((error) => {
                alert("Error")
            });
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="product_edit">
                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Edit Product</h1>
                    </div>
                    <div className="titlebar_item">
                        <input className='btn' type="submit" value="Save"/>
                    </div>
                </div>
                <div className="card_wrapper">
                    <div className="wrapper_left">
                        <div className="card">
                            <p>Name</p>
                            <input type="text" value={name} onChange={(event) => {setName(event.target.value)}}/>
                            <p>Description (Optional)</p>
                            <textarea cols="10" rows="5" value={description} onChange={(event) => {setDescription(event.target.value)}}></textarea>
                            <div className="media">
                                <ul className="images_list">
                                    <li className="image_item">
                                        <div className="image_item-img">
                                            {
                                                avatar === true 
                                                ?<img src={ourImage(photo)} style={{width: 117, height: 100}} />
                                                :<img src={preview} style={{width: 117, height: 100}} />
                                            }
                                        </div>
                                    </li>
                                    <li className="image_item">
                                        <label className="image_item-form--label">Add Image</label>
                                        <input type="file" className="image_item-form--input" onChange={handleFileSelect} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper_right">
                        <div className="card">
                            <p>Product Type</p>
                            <input type="text" value={type} onChange={(event) => {setType(event.target.value)}}/>
                            <hr className="hr" />
                            <p>Inventory</p>
                            <input type="text" value={quantity} onChange={(event) => {setQuantity(event.target.value)}} />
                            <hr className="hr" />
                            <p>Price</p>
                            <input type="text" value={price} onChange={(event) => {setPrice(event.target.value)}}/>
                            <div className="br"></div>
                        </div>
                    </div>
                </div>
                <div className="titlebar">
                    <div className="titlebar_item"></div>
                        <div className="titlebar_item">
                            <input className='btn' type="submit" value="Save"/>
                        </div>
                </div>
            </div>
        </form>
        
    </div>
  )
}

export default Edit