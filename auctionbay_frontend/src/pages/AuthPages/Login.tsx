import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../assets/css/AuthPages.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import presentation2 from '../../assets/images/presentacija2.png'; 
import logo from '../../assets/images/logo.png'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
  
      const { token } = await response.json();
      localStorage.setItem('token', token);

      try {
        const response = await fetch('http://localhost:3000/auth/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        if (!response.ok) {
          throw new Error('Wrong username or password'); 
        }
      
        const responseData = await response.json();
        navigate('/'+responseData.route); 
      
      } catch (error) {
        console.error('Error authenticating:', error);

        toast.error((error as Error).message);
      }
  
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex-container">
      <div className='visualContainer'>
        <img src={presentation2} alt='presentacija' className='presentacija'/>
      </div>
      <div className='form'>
        <div className='logoPic'>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1 className="auctionText">Welcome back!</h1>
        <p className='LoginText'>Please enter your details.</p>
        <form className='LoginForm' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="label">Username</label>
            <input type="text" className="form-control" id="username" name="username" placeholder='username' onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder='password' onChange={handleChange} required></input>
          </div>
          <Link className="link" to="/forgot-password">Forgot password?</Link>
          <button type="submit" className="btn btn-primary">Login</button>
          <ToastContainer />
        </form>

        
        <p className='paragraph'>Don't have an account? <Link className='LoginToSignupLink' to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;