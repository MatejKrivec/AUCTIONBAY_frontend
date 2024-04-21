import React, { useEffect, useState } from 'react'
import '../../../assets/css/EditProfile.css';

interface ChangeProfilePicProps {
  onClose:  () => void;
}
const ChangeProfilePicture: React.FC<ChangeProfilePicProps> = ({onClose}) => {

  const [profilePicture, setProfilePicture] = useState<string>('');
  const [imageKey, setImageKey] = useState<string>('');


  useEffect(() => {
    getProfilePicture()
  }, [])

  const getProfilePicture = async () => {
    try{
      const userID = localStorage.getItem('UserId');

      const response = await fetch(`http://localhost:3000/users/${userID}`)
      if(!response.ok){
        throw new Error('Failed to fetch user');
      }
  
      const userData = await response.json();
      const profilePicKey = userData.profilePicture;
      setImageKey(profilePicKey);
      const profilePic = localStorage.getItem(profilePicKey)
  
       if (profilePic) {
          setProfilePicture(profilePic);
        } else {
          console.error('Profile picture not found in local storage');
        }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  }

  const handleCancel = () =>{
    if(onClose){
      onClose();
    }
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setProfilePicture(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (profilePicture) {
      // Save the current image value to local storage
      localStorage.setItem(imageKey, profilePicture);
      console.log('Profile picture saved to local storage');
      handleCancel()
    } else {
      console.error('No profile picture to save');
    }
  };

  
  return (
    <div className="change-profile-picture-overlay">
      <div className="change-profile-picture-window">
          <div className="change-profile-picture">
            <h2>Change Profile Picture</h2>
            <form onSubmit={handleSubmit}>
              <div className="UploadPicContainer">
                <img src={profilePicture} alt="ProfilePic" className="ProfilePic"></img>
                <label className="UploadPictureBtn">
                Upload new picture
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
              </div>
              <div className="buttonsContainer">
                <button className="cancel-picture-button" onClick={handleCancel}>Cancel</button>
                <button className="save-picture-button" type='submit'>Save</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
