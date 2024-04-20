import React from 'react'
import '../../../assets/css/AuctionItem.css';


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
  
  const MyAuctionItem = ({ auction, handleEditAuctionClick, handleDeleteAuctionClick }: { auction: Auction; handleEditAuctionClick: (auctionId: number) => void; handleDeleteAuctionClick: (auctionId: number) => void; }) => {
    const getStatusString = () => {
      return 'status';
    };
  
    const getTimeRemainingString = () => {
      return 'time';
    };

    const getImageFromLocalStorage = (key: string) => {
      const image = localStorage.getItem(key);
      return image ? image : ''; 
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
          <button className='editBtn' onClick={() => handleEditAuctionClick(auction.auctionId)}><i className='fas fa-edit'></i> Edit</button>
        </div>
      </div>
    );
  };

export default MyAuctionItem
