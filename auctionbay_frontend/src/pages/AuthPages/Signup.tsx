import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/AuthPages.css';
import DefaultProfilePic from '../../assets/images/DefaultProfilePic.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import presentation2 from '../../assets/images/presentacija2.png'; 
import logo from '../../assets/images/logo.png'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { ...errors };

    const username = `${formData.username} ${formData.surname}`;


    if (!formData.username.trim()) {
      newErrors.username = 'Name is required';
      hasError = true;
    } else {
      newErrors.username = '';
    }

    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required';
      hasError = true;
    } else {
      newErrors.surname = '';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
      hasError = true;
    } else {
      newErrors.email = '';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else {
      newErrors.password = '';
    }

    if (!formData.repeatPassword.trim()) {
      newErrors.repeatPassword = 'Repeat Password is required';
      hasError = true;
    } else if (formData.password.trim() !== formData.repeatPassword.trim()) {
      newErrors.repeatPassword = 'Passwords do not match';
      hasError = true;
    } else {
      newErrors.repeatPassword = '';
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    try {
      const generateImageKey = (): string => {
        return `User-ProfilePic-${Date.now()}`;
      };
    
      const setImageToLocalStorage = () => {
        const key = generateImageKey();
        localStorage.setItem(key, DefaultProfilePic);
        return key;
      };

      const profilePictureKey = setImageToLocalStorage();

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: formData.email,
          password: formData.password,
          profilePicture: profilePictureKey 
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      window.location.href = '/login';
  
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error((error instanceof Error) ? error.message : 'Error creating user');
    }
  };

  return (
    <div className="flex-container">
      <div className='visualContainer'>
        <img src={presentation2} alt='presentacija' className='presentacija'/>
      </div>
      <div className='form'>
        <div className='logoPicSignup'>
          <img src={logo} alt="LogoSignup" className="logo" />
        </div>
        <h1 className="auctionText">Hello!</h1>
        <p className='SigninText'>Please enter your details.</p>
        <form className='SigninForm' onSubmit={handleSubmit}>
        <ToastContainer />
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username" className="label">Name</label>
              <input type="text" className="formUsername" id="username" placeholder='name' name="username" onChange={handleChange} required />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="surname" className="label">Surname</label>
              <input type="text" className="formUsername" id="surname" name="surname" placeholder='surname' onChange={handleChange} required />
              {errors.surname && <p className="error">{errors.surname}</p>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">E-mail</label>
            <input type="email" className="form-control" id="email" name="email" placeholder='email' onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder='password' onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword" className="label">Repeat Password</label>
            <input type="password" className="form-control" id="repeatPassword" name="repeatPassword" placeholder='repeat password' onChange={handleChange} required />
            {errors.repeatPassword && <p className="error">{errors.repeatPassword}</p>}
          </div>
          <button type="submit" className="btnSubmitSignup">Signup</button>
          <p className='SignUpParagraph'>Already have an account? <Link className='SignUpToLoginLink' to="/login"> Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
