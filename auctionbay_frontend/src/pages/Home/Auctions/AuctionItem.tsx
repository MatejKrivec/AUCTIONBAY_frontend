import React from 'react'


interface Auction {
    auctionId: number;
    name: string;
    description: string;
    image: string;
    startingPrice: number;
    maxPrice: number;
    price: number;
    startTime: string;
    endTime: string;
  }
  
const AuctionItem = ({ auction, handleEditAuctionClick, handleDeleteAuctionClick }: { auction: Auction; handleEditAuctionClick: () => void;handleDeleteAuctionClick: (auctionId: number) => void;  }) => {
    const getStatusString = () => {
      return 'status';
    };
  
    const getTimeRemainingString = () => {
      return 'time';
    };

    // Function to get image from local storage using the key
    const getImageFromLocalStorage = (key: string) => {
      const image = localStorage.getItem(key);
      return image ? image : ''; // Return empty string if image is not found
    };

   
  
    return (
      <div className='auctionItem'>
        <div className='status'>
          <p>{getStatusString()}</p>
          <p>{getTimeRemainingString()}</p>
        </div>
        <div className='name'>{auction.name}</div>
        <div className='price'>Price: ${auction.price}</div>
        <img src={getImageFromLocalStorage(auction.image)} alt={auction.name} className='image' />
        <div className='buttonsContainer'>
          <button className='deleteBtn' onClick={() => handleDeleteAuctionClick(auction.auctionId)}><i className='fas fa-trash'></i></button>
          <button className='editBtn' onClick={handleEditAuctionClick}><i className='fas fa-edit'></i> Edit</button>
        </div>
      </div>
    );
  };

export default AuctionItem
