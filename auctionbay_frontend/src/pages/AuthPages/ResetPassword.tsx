import { Link } from 'react-router-dom';
import '../../assets/css/AuthPages.css';
import presentation2 from '../../assets/images/presentacija2.png'; 
import logo from '../../assets/images/logo.png'; 

const ResetPassword = () => {
  return (
    <div className="flex-container">
        <div className='visualContainer'>
          <img src={presentation2} alt='presentacija' className='presentacija'/>
        </div>
        <div className='form'>
          <div className='logoPic'>
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <h1 className="auctionText">Forgot password!</h1>
          <p className='ResetPasswordText'>No worries we will send you reset instructions.</p>
          <form className='ResetPasswordForm'>
            <div className="form-group">
              <label htmlFor="Email" className="label">Email</label>
              <input type="Email" className="form-control" placeholder='email' id="Email" name="Email" />
            </div>
            <button type="submit" className="btnBackToLogin">Reset password</button>
            <Link className="linkBackToLogin" to="/login">&lt; Back to login</Link>
        </form>
        </div>
    </div>
  )
}

export default ResetPassword
