import '../../assets/css/AuthPages.css';

const ResetPassword = () => {
  return (
    <div className="flex-container">
        <div className='visual'>
          <img src='src\assets\images\presentacija2.png' alt='presentacija' className='presentacija'/>
        </div>
        <div className='form'>
          <div className='logoPic'>
            <img src="src\assets\images\logo.png" alt="Logo" className="logo" />
          </div>
          <h1 className="auctionText">Forgot password!</h1>
          <p className='ResetPasswordText'>No worries we will send you reset instructions.</p>
          <form className='ResetPasswordForm'>
            <div className="form-group">
              <label htmlFor="Email" className="label">Email</label>
              <input type="Email" className="form-control" id="Email" name="Email" />
            </div>
            <button type="submit" className="btnBackToLogin">Reset password</button>
            <a href="#" className="linkBackToLogn"> &lt; Back to login </a>
        </form>
        </div>
    </div>
  )
}

export default ResetPassword
