import React, { useState } from 'react'
import ProfileSettings from './ProfileSettings';


const LogOut = ({handleProfileSettingsClosee}:{handleProfileSettingsClosee: () => void}) => {
    const [isProfileSettingsVisible, setProfileSettingsVisible] = useState(false);

    const handleProfileSettingsToggle = () => {
        setProfileSettingsVisible(!isProfileSettingsVisible);
    };

    const handleProfileSettingsClose = () => {      // Je uporabno ce zelis closati component al pa poslat data iz dva nivoja ali vec nizje
        if(handleProfileSettingsClosee){
            handleProfileSettingsClosee();
          }
      setProfileSettingsVisible(false); 
    };
    
    return (
        <div>
            {isProfileSettingsVisible ? (
                <ProfileSettings onClose={handleProfileSettingsClose} />
            ) : (
                <div className="LogOut-overlay">
                    <div className="LogOut-window">
                        <div className='LogOut'>
                            <a className='LogOutSettingsLink' onClick={handleProfileSettingsToggle}>&#x2699; Profile settings</a>
                            <button className='LogOutBtn'>Log out</button>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogOut
