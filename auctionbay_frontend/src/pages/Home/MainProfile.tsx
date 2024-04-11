import React, { useState } from 'react'
import '../../assets/css/HomePage.css';

const MainProfile = () => {
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleChange = (option: React.SetStateAction<string>) => {
      setSelectedOption(option);
    };
  
    const renderContent = () => {
      switch (selectedOption) {
        case 'option1':
          return (
            <div className='MyAuctions'>
              Content for Option 1
            </div>
          );
        case 'option2':
          return (
            <div className='Bidding'>
              Content for Option 2
            </div>
          );
        case 'option3':
          return (
            <div className='Won'>
              Content for Option 3
            </div>
          );
        default:
          return null;
      }
    };
    return (
      <div>
        <main className='main'>
          <div className='HelloUserText'>
            <h1>Hello Skill up Mentor !</h1>
          </div>
          <div className='ContentOptions'>
            <button onClick={() => handleChange('option1')} className={selectedOption === 'option1' ? 'active' : ''}>My auctions</button>
            <button onClick={() => handleChange('option2')} className={selectedOption === 'option2' ? 'active' : ''}>Bidding</button>
            <button onClick={() => handleChange('option3')} className={selectedOption === 'option3' ? 'active' : ''}>Won</button>
          </div>
          {renderContent()}
        </main>
      </div>
    )
}

export default MainProfile
