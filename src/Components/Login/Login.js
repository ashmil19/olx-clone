import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory, Link } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext);
  const history = useHistory();
  const [prevToastId, setPrevToastId] = useState(null);


  const handleLogin = (e)=>{
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      history.push('/')
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


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
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
          <button>Login</button>
        </form>
        <Link className='signup' to="/signup">Signup</Link>
      </div>
        <Toaster />
    </div>
  );
}

export default Login;
