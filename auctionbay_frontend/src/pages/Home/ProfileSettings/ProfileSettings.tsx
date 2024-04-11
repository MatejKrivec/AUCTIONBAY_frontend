import React, { useState } from 'react'
import '../../../assets/css/EditProfile.css';
import ChangePassword from './ChangePassword';
import ChangeProfilePicture from './ChangeProfilePicture';


interface ProfileSettingsProps {
  onClose: () => void; // Define the type of onClose prop
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({onClose}) => {

  const [ChangePasswordVisible,setChangePasswordVisible] = useState(false);
  const [ChangeProfilePicVisible,setChangeProfilePicVisible] = useState(false);

  const handleCancel = () => {
    // Call the onClose function passed from the parent component
    if (onClose) {
      onClose();
    }
  };

  const handleChangePasswordClick = () => {
    setChangePasswordVisible(true);
  };

  const handleChangeProfilePicClick = () => {
    setChangeProfilePicVisible(true);
  }

  const handleChangePasswordClose = () => {
    setChangePasswordVisible(false); // Close the profile settings window
  };

  const handleChangeProfilePictureClose = () => {
    setChangeProfilePicVisible(false); // Close the profile settings window
  };

  return (
    <>
      {ChangePasswordVisible ? (<ChangePassword onClose={ handleChangePasswordClose} />) : 
      ChangeProfilePicVisible ? (<ChangeProfilePicture onClose={handleChangeProfilePictureClose} />) : 
      (
        <div className="profile-settings-overlay">
          <div className="profile-settings-window">
            <div className="profile-settings">
              <h2>Edit Profile</h2>
              <form>
                <div className='form-row'>
                  <div className="form-group">
                    <label htmlFor="firstName">Name:</label>
                    <input type="text" id="firstName" name="firstName" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Surname:</label>
                    <input type="text" id="lastName" name="lastName" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div className='linksContainer'>
                  <a className='changePassword' onClick={handleChangePasswordClick}>Change password</a>
                  <a className='changeProfilePic' onClick={handleChangeProfilePicClick}>Change profile picture</a>
                </div>
                <div className="button-container">
                  <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  <button className="save-button">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
}

export default ProfileSettings
