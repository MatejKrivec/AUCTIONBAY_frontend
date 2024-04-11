
import '../../assets/css/AuthPages.css';

const Login = () => {
  return (
    <div className="flex-container">
        <div className='visual'>
          <img src='src\assets\images\presentacija2.png' alt='presentacija' className='presentacija'/>
        </div>
        <div className='form'>
          <div className='logoPic'>
            <img src="src\assets\images\logo.png" alt="Logo" className="logo" />
          </div>
          <h1 className="auctionText">Welcome back!</h1>
          <p className='LoginText'>Please enter your details.</p>
          <form className='LoginForm'>
            <div className="form-group">
              <label htmlFor="username" className="label">Username</label>
              <input type="text" className="form-control" id="username" name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">Password</label>
              <input type="password" className="form-control" id="password" name="password" />
            </div>
            <a href="#" className="link">Forgot password?</a>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className='paragraph'>Dont have an account? <span>Sign up</span></p>
        </div>
    </div>
  )
}

export default Login
