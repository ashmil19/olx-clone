import React, { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import toast,{Toaster} from 'react-hot-toast';
import {ScaleLoader} from 'react-spinners'

const Create = () => {
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext)
  const history = useHistory()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const [prevToastId, setPrevToastId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e)=>{
      e.preventDefault()

      if(name.trim() === '' || category.trim() === '' || price.trim() === '' || !image){
        showToast('Fields are not filled')
        return
      }

      setLoading(true)
      firebase.storage().ref(`/image/${image.name}`).put(image)
      .then(({ref})=>{
        ref.getDownloadURL()
        .then((url)=>{
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString()
          })
        history.push('/')
        })
      })
      .catch((error)=>{
        alert(error.message)
      })
  }

  const showToast = (message)=>{
    if(prevToastId){
      toast.dismiss(prevToastId)
    }

    const newToastId = toast.error(message,{
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        width: '300px',
      },
    })
    setPrevToastId(newToastId)
  }

  const outerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div style={loading ? outerStyle : {}}>

      {loading ? <ScaleLoader
          loading={loading}
          size={150}
        /> : <div>
        <Header />
        <card>
          <div className="centerDiv">
            <form onSubmit={handleSubmit} >
              <label htmlFor="fname">Name</label>
              <br />
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                id="fname"
                name="Name"
              />
              <br />
              <label htmlFor="fname">Category</label>
              <br />
              <input
                className="input"
                type="text"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                id="fname"
                name="category"
              />
              <br />
              <label htmlFor="fname">Price</label>
              <br />
              <input 
                className="input" 
                type="number" 
                value={price}
                onChange={(e)=> setPrice(e.target.value)}
                id="fname" 
                name="Price" 
              />
              <br />
            
            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : '' }></img>
            
              <br />
              <input onChange={(e)=> {
                setImage(e.target.files[0])
              }} type="file" />
              <br />
              <button  className="uploadBtn">upload and Submit</button>
              </form>
          </div>
        </card>
      </div>}
      <Toaster />
    </div>
  );
};

export default Create;
