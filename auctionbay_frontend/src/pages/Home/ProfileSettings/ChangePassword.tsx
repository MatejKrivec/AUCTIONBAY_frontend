import React, { useState } from 'react'
import '../../../assets/css/EditProfile.css';

interface ChangePasswordProps {
  onClose: () => void;
}


const ChangePassword: React.FC<ChangePasswordProps> = ({onClose}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const userId = localStorage.getItem('UserId');

      // Make a GET request to validate the current password
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentPassword}`,
        },
      });

      if (!response.ok) {
        setError('Invalid current password');
        return;
      }

      const password = newPassword
      const updatedPasswordData = {
        password
      };

      const updateResponse = await fetch(`http://localhost:3000/users/posodobitev/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPasswordData),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update password');
      }

      handleCancel();
    } catch (error: any) {
      console.error('Error updating password:', error.message);
    }
  };


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
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input type="password" id="currentPassword" name="currentPassword" value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div className="button-container">
              <button className="cancel-password-button" onClick={handleCancel}>Cancel</button>
              <button className="save-password-button" type='submit'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
