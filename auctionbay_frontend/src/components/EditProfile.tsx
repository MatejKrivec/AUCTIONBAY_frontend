/*import React, { useState } from 'react'
import '../../assets/css/EditProfile.css';
import ProfileSettings from './EditProfile/ProfileSettings';
import ChangePassword from './EditProfile/ChangePassword';
import ChangeProfilePicture from './EditProfile/ChangeProfilePicture';



const EditProfile = () => {
    const [activeOption, setActiveOption] = useState('profile');

    const handleOptionChange = (option: React.SetStateAction<string>) => {
      setActiveOption(option);
    };
  
    const renderContent = () => {
      switch (activeOption) {
        case 'profile':
          return <ProfileSettings/>;
        case 'changePassword':
          return <ChangePassword/>;
        case 'changePicture':
          return <ChangeProfilePicture/>;
        default:
          return null;
      }
    };
  
    return (
      <div className="edit-profile-page">
        <div className="menu">
          <div className="back-button">&#9664; Back</div>
          <div className="options">
            <div className={`option ${activeOption === 'profile' ? 'active' : ''}`} onClick={() => handleOptionChange('profile')}>Profile Settings</div>
            <div className={`option ${activeOption === 'changePassword' ? 'active' : ''}`} onClick={() => handleOptionChange('changePassword')}>Change Password</div>
            <div className={`option ${activeOption === 'changePicture' ? 'active' : ''}`} onClick={() => handleOptionChange('changePicture')}>Change Profile Picture</div>
          </div>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    );
}

export default EditProfile*/
