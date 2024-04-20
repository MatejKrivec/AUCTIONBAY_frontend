import React, { useState } from 'react';
import '../../../assets/css/AddAuction.css';

const AddAuction = ({ handleCancelAddClick }: { handleCancelAddClick: () => void }) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null); // State variable for image key
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    endTime: '',
   
  });

  const handleAddImageClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

   const generateImageKey = (): string => {
      return `auction-image-${Date.now()}`;
    };

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImageUploaded(true);
        const key = generateImageKey();
        setImageKey(key)
        localStorage.setItem(key, reader.result); 
        setImage(reader.result); 
      }
    };

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const parsedValue = name === 'startingPrice' ? parseFloat(value) : value; // Parse value to number if it's startingPrice
    setFormData({ ...formData, [name]: parsedValue });
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteImageClick = () => {
    setImage(null);
    setImageUploaded(false);
  };

  const handleStartAuctionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    try {
      if (!image) {
        throw new Error('Please upload an image');
      }

      const userId = localStorage.getItem('UserId');
      if (!userId) {
        throw new Error('UserId not found in local storage');
      }
      console.log('user id  ' + userId)

      const auctionData = {
        ...formData,
        userId: parseInt(userId, 10), 
        image: imageKey, 
        startTime: new Date(), 
        maxPrice: 1000, 
        price: parseFloat(formData.startingPrice), 
        startingPrice: parseFloat(formData.startingPrice),
        endTime: new Date(formData.endTime).toISOString()
      };

      const response = await fetch('http://localhost:3000/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create auction');
      }

      //console.log('Auction data:', auctionData);
      // Reset the form after successful submission
      setImage(null);
      setImageUploaded(false);
      setFormData({
        name: '',
        description: '',
        startingPrice: ' ',
        endTime: ''
  
      }); 

      handleCancelAddClick();
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <div className="AddAuction-overlay">
      <div className="AddAuction-window">
        <div className='addAuction'>
          <h2 className='title'>Add auction</h2>
          <div className='imageContainer' >
            {imageUploaded ? (
              <>
                {image && <img src={image} alt="Uploaded image" className='imagePic' />}
                <button className='deleteImageBtn' onClick={handleDeleteImageClick}><i className='fas fa-trash'></i></button>
              </>
            ) : (
              <input className='AddImageInput' type="file" accept="image/jpeg, image/png" onChange={handleAddImageClick} />
            )}
          </div>
          <form onSubmit={handleStartAuctionSubmit}>
            <div className='forma'>
              <div className='titleANDdescription'>
                <label htmlFor="Title">Title</label>
                <input className='titleTextInput' type="text" id="Title" name="name" value={formData.name} onChange={handleInputChange} />

                <label htmlFor="Description">Description</label>
                <textarea id="Description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
              </div>
              <div className='row'>
                <div className="priceDiv">
                  <label htmlFor="Price">Starting price</label>
                  <input type="number" id="Price" name="startingPrice" value={formData.startingPrice} onChange={handleInputChange} />
                </div>
                <div className="dateDiv">
                  <label htmlFor="ExpDate">End date</label>
                  <input type="date" id="ExpDate" name="endTime" value={formData.endTime} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <div className='btnContainer'>
              <button className='cancelBtn' onClick={handleCancelAddClick}>Cancel</button>
              <button className='StartAuctionBtn' type='submit'>Start auction</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAuction;
