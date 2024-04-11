import React from 'react'
import '../../../assets/css/EditProfile.css';

interface ChangeProfilePicProps {
  onClose:  () => void;
}
const ChangeProfilePicture: React.FC<ChangeProfilePicProps> = ({onClose}) => {

  const handleCancel = () =>{
    if(onClose){
      onClose();
    }
  }

  return (
    <div className="change-profile-picture-overlay">
      <div className="change-profile-picture-window">
          <div className="change-profile-picture">
            <h2>Change Profile Picture</h2>
            <form>
              <div className="UploadPicContainer">
                <img src='.\src\assets\images\DefaultProfilePic.png' alt="ProfilePic" className="ProfilePic"></img>
                <button className='UploadPictureBtn'>Upload new picture</button>
              </div>
              <div className="button-container">
              <button className="cancel-picture-button" onClick={handleCancel}>Cancel</button>
              <button className="save-picture-button">Save</button>
            </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
