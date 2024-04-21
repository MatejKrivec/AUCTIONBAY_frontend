import React, { useState } from 'react'
import '../../assets/css/MainProfile.css';
import MyAuctions from './Profile/MyAuctions';
import Bidding from './Profile/Bidding';
import Won from './Profile/Won';



const MainProfile = ({ username }: { username: string }) => {
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleChange = (option: React.SetStateAction<string>) => {
      setSelectedOption(option);
    };


  
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
          <div className='HelloUserText'>
          <h1>Hello {username}!</h1>
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
