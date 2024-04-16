import React, { useState } from 'react';
import '../../assets/css/HomePage.css';
import MainProfile from './MainProfile';
import MainAuctions from './MainAuctions';
import LogOut from './ProfileSettings/LogOut';
import '@fortawesome/fontawesome-free/css/all.min.css';



const HomePage= () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [IsLogOutVisible,setIsLogOutVisible] = useState(false)

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        if (activeTab === 'profile') {
            return (
                <MainProfile />
            );
        } else if (activeTab === 'auctions') {
            return (
                <MainAuctions />
            );
        }
    };

    const handleSettingsClick = () => {
      setIsLogOutVisible(!IsLogOutVisible)
    }

    const handleSettingsClose= () => {
        setIsLogOutVisible(!IsLogOutVisible)
      }

    

    return (
        <div className='HomePage'>
            <header>
                <div className='navigacija'>
                    <div className='logoContainer'>
                        <img src='.\src\assets\images\roundedLogo.png' alt="Logo" className="logo"></img>
                    </div>
                    <div className='NavButtons'>
                        <button onClick={() => handleTabChange('auctions')} className={activeTab === 'auctions' ? 'active' : ''}>
                            <i className="fas fa-home"></i> Auctions
                        </button>
                        <button onClick={() => handleTabChange('profile')} className={activeTab === 'profile' ? 'active' : ''}>
                            <i className="fas fa-user"></i> Profile
                        </button>
                    </div>
                    <div className='ProfileNav'>
                        <button  onClick={handleSettingsClick} className='ProfileEditBtn'>+</button>
                        <img src='.\src\assets\images\DefaultProfilePic.png' alt="ProfilePic" className="ProfilePicture"></img>
                    </div>
                    
                    
                </div>
            </header>
            {renderContent()}
            
            {IsLogOutVisible && (<LogOut handleProfileSettingsClosee={handleSettingsClose}/>)}
            <footer className="footer">
                <p>@Matej-Krivec-Skill-Up-Mentor</p>
            </footer>
        </div>
    )
}

export default HomePage;
