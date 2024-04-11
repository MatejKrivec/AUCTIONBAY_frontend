import React, { useState } from 'react';
import '../../assets/css/HomePage.css';
import MainProfile from './MainProfile';
import MainAuctions from './MainAuctions';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import LogOut from './ProfileSettings/LogOut';



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

    const handleProfilePicClick = () => {
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
                        <button onClick={() => handleTabChange('auctions')} className={activeTab === 'auctions' ? 'active' : ''}>Auctions</button>
                        <button onClick={() => handleTabChange('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</button>
                    </div>
                    <div className='ProfileNav'>
                        <button  onClick={handleProfilePicClick} className='ProfileEditBtn'>+</button>
                        <img src='.\src\assets\images\DefaultProfilePic.png' alt="ProfilePic" className="ProfilePicture"></img>
                    </div>
                    
                </div>
            </header>
            {renderContent()}
            
            {IsLogOutVisible && (<LogOut/>)}
            <footer className="footer">
                <p>@Matej-Krivec-Skill-Up-Mentor</p>
            </footer>
        </div>
    )
}

export default HomePage;
