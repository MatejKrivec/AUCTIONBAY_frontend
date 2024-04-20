import React, { useState } from 'react'

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

  
const AuctionItem = ({ auction, onClick }: { auction: Auction, onClick: () => void }) => {
  
    const [auctions, setAuctions] = useState<Auction[]>([]);
  
    const getStatusString = () => {
      return 'status'
    };
  
    const getTimeRemainingString = () => {
      return 'time'
    };
  
    const getImageFromLocalStorage = (key: string) => {
      const image = localStorage.getItem(key);
      return image ? image : ''; 
    };
  
    return (
      <div className='auctionItem' onClick={onClick}>
        <div className='status'>
          <p>{getStatusString()}</p>
          <p>{getTimeRemainingString()}</p>
        </div>
        <div className='name'>{auction.name}</div>
        <div className='price'>Price: ${auction.price}</div>
        <div className='ImageContainer'>
          <img src={getImageFromLocalStorage(auction.image)} alt={auction.name} className='imagee' />
        </div>
      </div>
    );
  };

export default AuctionItem
