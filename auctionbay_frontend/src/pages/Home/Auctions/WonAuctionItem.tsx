import React from 'react';

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

const WonAuctionItem = ({ auction }: { auction: Auction; }) => {
  const getImageFromLocalStorage = (key: string) => {
    const image = localStorage.getItem(key);
    return image ? image : '';
  };

  return (
    <div className='auctionItemContainer'>
      <div className='statusContainer'>
        <p className='auctionStatus'>Done</p>
      </div>
      <div className='nameContainer'>{auction.name}</div>
      <div className='price'>Price: ${auction.price}</div>
        <img src={getImageFromLocalStorage(auction.image)} alt={auction.name} className='Pic' />
    </div>
  );
};

export default WonAuctionItem;
