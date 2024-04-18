import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import '../../assets/css/AuthPages.css';

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

    // Validation
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
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: formData.email,
          password: formData.password
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      // Redirect to login page after successful user creation
      window.location.href = '/login';
  
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex-container">
      <div className='visual'>
        <img src='src\assets\images\presentacija2.png' alt='presentacija' className='presentacija'/>
      </div>
      <div className='form'>
        <div className='logoPicSignup'>
          <img src="src\assets\images\logo.png" alt="LogoSignup" className="logo" />
        </div>
        <h1 className="auctionText">Hello!</h1>
        <p className='SigninText'>Please enter your details.</p>
        <form className='SigninForm' onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username" className="label">Name</label>
              <input type="text" className="formUsername" id="username" name="username" onChange={handleChange} required />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="surname" className="label">Surname</label>
              <input type="text" className="formUsername" id="surname" name="surname" onChange={handleChange} required />
              {errors.surname && <p className="error">{errors.surname}</p>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">E-mail</label>
            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword" className="label">Repeat Password</label>
            <input type="password" className="form-control" id="repeatPassword" name="repeatPassword" onChange={handleChange} required />
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
