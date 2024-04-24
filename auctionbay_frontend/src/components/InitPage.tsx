import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
//import './assets/InitPage.css';
import '../assets/css/InitPage.css';

const InitPage = () => {

  const navigate = useNavigate();

  const LoginBtnClick = () => {
    navigate('/login')
  }
  const SignInBtnClick = () => {
    navigate('/signup')
  }

  return (
    <div className="introPage">
      <header className="header">
        <div className="logoContainer">
          <img src="src\assets\images\AU_logo.png" alt="Logo" className="logo" />
        </div>
        <div className="authOptions">
          <button className="loginButton" onClick={LoginBtnClick}>Login</button>
          <span> or </span>
          <button className="signupButton" onClick={SignInBtnClick}>Sign Up</button>
        </div>
      </header>
      <main className="mainContent">
        <h1 className="auctionText">E-auctions made easy!</h1>
        <p>This is some text explaining your app, its features, and how it makes e-auctions easy for everyone.</p>
        <button className="startBiddingButton">Start Bidding</button>
        <div className='visual'>
          <img src="src\assets\images\presentacija.png" alt="Visual Representation" className="visualRepresentation" />
        </div>
      </main>
      <footer className="footer">
        <p>@Matej-Krivec-Skill-Up-Mentor</p>
      </footer>
    </div>
  )
}

export default InitPage
