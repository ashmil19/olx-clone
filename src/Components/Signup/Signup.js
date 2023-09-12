import React, { useContext, useState, CSSProperties } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory, Link } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import {ScaleLoader} from 'react-spinners'

export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext);
  const [prevToastId, setPrevToastId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(username.trim() === '' || phone.trim() === '' ){
      showToast("Fields are not completly filled")
      return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      setLoading(true)
      result.user.updateProfile({displayName: username})
      .then(()=>{
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        })
        .then(()=>{
          history.push("/login")
        })
      })
    })
    .catch((error)=>{
      showToast(error.message)
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
    <div style={outerStyle}>
      {loading ? <ScaleLoader
          loading={loading}
          size={150}
        /> : <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link className="login" to="/login">Login</Link>
      </div>}
      <Toaster />
        
    </div>
  );
}
