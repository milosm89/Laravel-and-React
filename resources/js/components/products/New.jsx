import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const New = () => {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [type, setType] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")

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
            const response = await axios.post("/api/add_product", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            }).then((res) => {
                alert("File Uploaded Successfully");
            }).catch((error) => {
                alert("Error")
            });
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setPreview(reader.result)
        }
        setPhoto(event.target.files[0])
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="products_create">
                    <div className="titlebar">
                        <div className="titlebar_item">
                            <h1>Add Product</h1>
                        </div>
                        <div className="titlebar_item">
                            <input className='btn' type="submit" value="Save"/>
                        </div>
                    </div>
                    <div className="card_wrapper">
                        <div className="wrapper_left">
                            <div className="card">
                                <p>Name</p>
                                <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}} />
                                <p>Description (Optional)</p>
                                <textarea cols="10" rows="5" value={description} onChange={(event)=>{setDescription(event.target.value)}}></textarea>
                                <div className="media">
                                    <ul className="images_list">
                                        <li className="image_item">
                                            <div className="image_item-img">
                                                <img src={preview} style={{width: 117, height: 100}} />
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
                                <input type="text" value={type} onChange={(event)=>{setType(event.target.value)}} />
                                <hr className="hr" />
                                <p>Inventory</p>
                                <input type="text" value={quantity} onChange={(event)=>{setQuantity(event.target.value)}} />
                                <hr className="hr" />
                                <p>Price</p>
                                <input type="text" value={price} onChange={(event)=>{setPrice(event.target.value)}}/>
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
};

export default New;