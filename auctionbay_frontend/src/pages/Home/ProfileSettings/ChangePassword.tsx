import React, { useState } from 'react'
import '../../../assets/css/EditProfile.css';

interface ChangePasswordProps {
  onClose: () => void;
}


const ChangePassword: React.FC<ChangePasswordProps> = ({onClose}) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    try {

      console.log(formData)
      if (formData.newPassword !== formData.confirmPassword) {
        console.log('error paswords dont match')
      }
      else{
        const userId = localStorage.getItem('UserId');


        console.log(formData.currentPassword)

      const response = await fetch(`http://localhost:3000/users/validatePassword/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword: formData.currentPassword }),
      });

      const isPasswordValid = await response.text(); 
      console.log("Password validation response: " + isPasswordValid);

      if (isPasswordValid === 'false') {
        console.log('Invalid current password')
        return;
      }


  
        const password = formData.newPassword
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
      }

      
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
          <form >
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input type="password" id="currentPassword" name="currentPassword" value={formData.currentPassword}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword" value={formData.newPassword}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
                onChange={handleChange}/>
            </div>
            <div className="button-container">
              <button className="cancel-password-button" onClick={handleCancel}>Cancel</button>
              <button className="save-password-button"  onClick={handleSave}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
