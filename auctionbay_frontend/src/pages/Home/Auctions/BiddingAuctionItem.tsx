import React, { useEffect, useState } from 'react';
import '../../../assets/css/Bidding.css';

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

interface Bid {
  bidId: number;
  userId: number;
  amount: number;
}

const BiddingAuctionItem = ({ auction }: { auction: Auction; }) => {
  const [winningStatus, setWinningStatus] = useState<string>('');

  useEffect(() => {
    fetchBids();
  }, [auction.auctionId]);

  const fetchBids = async () => {
    try {
      if (!auction.auctionId) {
        console.error('Auction ID is missing or invalid');
        return;
      }

      const response = await fetch(`http://localhost:3000/bids/byAuctionId/${auction.auctionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidData: Bid[] = await response.json();
      if (bidData.length > 0) {
        const highestBid = bidData.reduce((prev, current) => (prev.amount > current.amount ? prev : current));
        const userId = localStorage.getItem('UserId');
        if (userId && parseInt(userId, 10) === highestBid.userId) {
          setWinningStatus('Winning');
        } else {
          setWinningStatus('Outbid');
        }
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const getStatus = () => {
    return winningStatus;
  };

  const getTimeRemainingString = () => {
    if (new Date() > new Date(auction.endTime)) {
      return ''; // Auction is done, display nothing
    } else {
      const timeDiffMs = new Date(auction.endTime).getTime() - new Date().getTime();
      const hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60)); // Convert milliseconds to hours

      if (hoursRemaining < 24) {
        return `${hoursRemaining}h`;
      } else if (hoursRemaining < 48) {
        return '1 day';
      } else {
        const daysRemaining = Math.ceil(hoursRemaining / 24);
        return `${daysRemaining} days`;
      }
    }
  };

  const getImageFromLocalStorage = (key: string) => {
    const image = localStorage.getItem(key);
    return image ? image : '';
  };

  return (
    <div className='auctionItemContainer'>
      <div className='statusContainer'>
        <p className={`auctionStatus ${getStatus() === 'Winning' ? 'WinningStatus' : 'OutbidStatus'}`}>{getStatus()}</p>
        <p className={`TimeParagraphItemElement ${getTimeRemainingString().includes('h') ? 'red' : ''}`}>
          {getTimeRemainingString()}
          <i className='fas fa-clock' style={{ marginLeft: '5px' }}></i>
        </p>
      </div>
      <div className='nameContainer'>{auction.name}</div>
      <div className='price'>Price: ${auction.price}</div>
      
        <img src={getImageFromLocalStorage(auction.image)} alt={auction.name} className='imagePic' />
  
    </div>
  );
};

export default BiddingAuctionItem;
