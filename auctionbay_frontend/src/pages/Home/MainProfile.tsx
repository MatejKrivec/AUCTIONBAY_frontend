import React, {  useEffect, useState } from 'react'
import '../../assets/css/MainProfile.css';
import MyAuctions from './Profile/MyAuctions';
import Bidding from './Profile/Bidding';
import Won from './Profile/Won';



const MainProfile = () => {
    const [selectedOption, setSelectedOption] = useState('option1');
    const [ime, setIme] = useState('');
   
    useEffect(() => {
      SetUserData();

  }, ); 

  const SetUserData = async () => {
      const id = localStorage.getItem('UserId');
      
      try {
          const response = await fetch(`http://localhost:3000/users/${id}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          
          if (!response.ok) {
              throw new Error('error');
          }

          const userData = await response.json();
          setIme(userData.username)
          
        
          
      } catch (error) {
          console.error('Error fetching username:', error);
      }
  }; 

    const handleChange = (option: React.SetStateAction<string>) => {
      setSelectedOption(option);
    };

    //const ime = localStorage.getItem('USERNAME')
  
    const renderContent = () => {
      switch (selectedOption) {
        case 'option1':
          return <MyAuctions/>;
        case 'option2':
          return <Bidding/>;
        case 'option3':
          return <Won />;
        default:
          return null;
      }
    };

    return (
      <div>
        <main className='main'>
          <div className='HelloUserTextContainer'>
            <h1 className='HelloUserTitle'>Hello {ime}!</h1>
          </div>
          <div className='OptionBtns'>
            <div className='ContentOptions'>
              <button onClick={() => handleChange('option1')} className={selectedOption === 'option1' ? 'active' : ''}>My auctions</button>
              <button onClick={() => handleChange('option2')} className={selectedOption === 'option2' ? 'active' : ''}>Bidding</button>
              <button onClick={() => handleChange('option3')} className={selectedOption === 'option3' ? 'active' : ''}>Won</button>
            </div>
          </div>
          
          {renderContent()}
        </main>
      </div>
    )
}

export default MainProfile
