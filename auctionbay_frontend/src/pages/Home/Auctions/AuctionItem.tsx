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
  
const AuctionItem = ({ auction, handleEditAuctionClick }: { auction: Auction; handleEditAuctionClick: () => void }) => {
    const getStatusString = () => {
      return 'status';
    };
  
    const getTimeRemainingString = () => {
      return 'time';
    };
  
    return (
      <div className='auctionItem'>
        <div className='status'>
          <p>{getStatusString()}</p>
          <p>{getTimeRemainingString()}</p>
        </div>
        <div className='name'>{auction.name}</div>
        <div className='price'>Price: ${auction.price}</div>
        <img src={auction.image} alt={auction.name} className='image' />
        <div className='buttonsContainer'>
          <button className='deleteBtn'><i className='fas fa-trash'></i></button>
          <button className='editBtn' onClick={handleEditAuctionClick}><i className='fas fa-edit'></i> Edit</button>
        </div>
      </div>
    );
  };

export default AuctionItem
