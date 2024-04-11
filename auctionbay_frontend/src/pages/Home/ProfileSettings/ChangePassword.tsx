import React from 'react'
import '../../../assets/css/EditProfile.css';

interface ChangePasswordProps {
  onClose: () => void;
}


const ChangePassword: React.FC<ChangePasswordProps> = ({onClose}) => {

  const handleCancel = () => {
    if(onClose) {
      onClose();
    }
  }

  return (
    <div className="change-password-overlay">
      <div className="change-password-window">
        <div className='password-settings'>
          <h2>Change Password</h2>
          <form>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input type="password" id="currentPassword" name="currentPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>
            <div className="button-container">
              <button className="cancel-password-button" onClick={handleCancel}>Cancel</button>
              <button className="save-password-button">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
