import React, { useEffect, useState } from 'react';
import '../../assets/css/HomePage.css';
import MainProfile from './MainProfile';
import MainAuctions from './MainAuctions';
import LogOut from './ProfileSettings/LogOut';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import roundedLogo from '../../assets/images/roundedLogo.png'; 




const HomePage= () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [IsLogOutVisible,setIsLogOutVisible] = useState(false)
  
    const [userData, setUserData] = useState('.\src\assets\images\UserError.png');

    useEffect(() => {
        SetUserData();

    }, ); 

    const SetUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3000/decode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to decode token');
            }
            
            const userData = await response.json();
            const userId = userData.id;
            localStorage.setItem('UserId', userId);


            const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userDataWithProfilePic = await userResponse.json();
            setUserData(userDataWithProfilePic.profilePicture);

         
            
        } catch (error) {
            toast.error((error as Error).message);
        }
    }; 


    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        if (activeTab === 'profile') {
      
            return (
                <MainProfile  />
            );
        } else if (activeTab === 'auctions') {
            return (
                <MainAuctions/>
            );
        }
    };

    const handleSettingsClick = async () => {
      setIsLogOutVisible(!IsLogOutVisible)
       
    }

    const handleSettingsClose = async () => {
        setIsLogOutVisible(!IsLogOutVisible)
        
    }

    const getImageFromLocalStorage = (key: string) => {
        const image = localStorage.getItem(key);
        return image ? image : ''; 
    };

    

    return (
        <div className='HomePage'>
            <header>
                <div className='navigacija'>
                    <div className='logoContainer'>
                        <img src={roundedLogo} alt="Logo" className="logo"></img>
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
                        <img src={getImageFromLocalStorage(userData)} alt="ProfilePic" className="ProfilePicture"></img>
                    </div>
                    
                    
                </div>
            </header>
            {renderContent()}
            
            {IsLogOutVisible && (<LogOut handleProfileSettingsClosee={handleSettingsClose}/>)}
            <ToastContainer />
          {/*<footer className="footer">
                <p>@Matej-Krivec-Skill-Up-Mentor</p>
            </footer>*/}  
        </div>
    )
}

export default HomePage;
