import React, { useState } from 'react'
import ProfileSettings from './ProfileSettings';


const LogOut = () => {
    const [isProfileSettingsVisible, setProfileSettingsVisible] = useState(false);

    const handleProfileSettingsToggle = () => {
        setProfileSettingsVisible(!isProfileSettingsVisible);
    };

    const handleProfileSettingsClose = () => {
      setProfileSettingsVisible(false); // Close the profile settings window
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
