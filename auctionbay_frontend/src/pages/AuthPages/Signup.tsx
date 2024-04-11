import '../../assets/css/AuthPages.css';

const Signup = () => {
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
          <form className='SigninForm'>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username" className="label">Name</label>
                <input type="text" className="formUsername" id="username" name="username" />
              </div>
              <div className="form-group">
                <label htmlFor="surname" className="label">Surname</label>
                <input type="text" className="formUsername" id="surname" name="surname" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label">E-mail</label>
              <input type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">Password</label>
              <input type="password" className="form-control" id="password" name="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">Repeat Password</label>
              <input type="password" className="form-control" id="password" name="password" />
            </div>
            <button type="submit" className="btnSubmitSignup">Signup</button>

            <p className='SignUpParagraph'>Already have an account? <span>Login</span></p>
        </form>
        </div>
    </div>
  )
}

export default Signup
