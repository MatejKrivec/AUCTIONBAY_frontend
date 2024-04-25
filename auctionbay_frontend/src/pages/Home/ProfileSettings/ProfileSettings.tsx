import React, { useEffect, useState } from 'react'
import '../../../assets/css/EditProfile.css';
import ChangePassword from './ChangePassword';
import ChangeProfilePicture from './ChangeProfilePicture';


interface ProfileSettingsProps {
  onClose: () => void; 
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({onClose}) => {

  const [ChangePasswordVisible,setChangePasswordVisible] = useState(false);
  const [ChangeProfilePicVisible,setChangeProfilePicVisible] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('UserId');
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await response.json();
      const [firstName, lastName] = data.username.split(' ');

      setUserData({
        firstName,
        lastName,
        email: data.email,
      });
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {

      const userId = localStorage.getItem('UserId');
      const username = `${userData.firstName.trim()} ${userData.lastName.trim()}`;
      const updatedUserData = {
        username,
        email: userData.email, 
      };



      const response = await fetch(`http://localhost:3000/users/posodobitev/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      localStorage.setItem('USERNAME', username);

      
      handleCancel();
    } catch (error: any) {
      console.error('Error updating user details:', error.message);
    }
  };

  const handleCancel = () => {
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
    setChangePasswordVisible(false); 
    onClose()
  };

  const handleChangeProfilePictureClose = () => {
    setChangeProfilePicVisible(false); 
    onClose()
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
              <form onSubmit={handleSave}>
                <div className='form-row'>
                  <div className="form-group">
                    <label htmlFor="firstName">Name:</label>
                    <input type="text" id="firstName" name="firstName" value={userData.firstName}
                      onChange={handleInputChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Surname:</label>
                    <input type="text" id="lastName" name="lastName" value={userData.lastName}
                      onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={userData.email}
                    onChange={handleInputChange}/>
                </div>
                <div className='linksContainer'>
                  <a className='changePassword' onClick={handleChangePasswordClick}>Change password</a>
                  <a className='changeProfilePic' onClick={handleChangeProfilePicClick}>Change profile picture</a>
                </div>
                <div className="button-container">
                  <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  <button className="save-button" type="submit">Save</button>
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
