import  { useEffect, useState } from 'react';

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

const AuctionItem = ({ auction, onClick }: { auction: Auction; onClick: () => void }) => {
  const [winningStatus, setWinningStatus] = useState<string>('');
 // const [highestBidderId, setHighestBidderId] = useState<number | null>(null);

  useEffect(() => {
    fetchBids();
  }, [auction.auctionId]);

  const fetchBids = async () => {
    try {
      const response = await fetch(`http://localhost:3000/bids/byAuctionId/${auction.auctionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidData: Bid[] = await response.json();
      if (bidData.length > 0) {
        const highestBid = bidData.reduce((prev, current) => (prev.amount > current.amount ? prev : current));
        //setHighestBidderId(highestBid.userId);
        const userId = localStorage.getItem('UserId');
        if (userId && parseInt(userId, 10) === highestBid.userId) {
          setWinningStatus('Winning');
        } else {
          setWinningStatus('');
        }
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const getStatus = () => {
    if (new Date() > new Date(auction.endTime)) {
      return 'Done';
    } else {
      return winningStatus ? 'Winning' : 'In Progress';
    }
  };

  const getTimeRemainingString = () => {
    if (new Date() > new Date(auction.endTime)) {
      return ''; 
    } else {
      const timeDiffMs = new Date(auction.endTime).getTime() - new Date().getTime();
      const hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60)); 

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
    <div className='uniqueAuctionItem' onClick={onClick}>
      <div className='uniqueStatus'>
        <p className={`uniqueAuctionStatus ${winningStatus ? 'uniqueWinningStatus' : 'uniqueInProgressStatus'}`}>{getStatus()}</p>
        <p className={`uniqueTimeParagraph ${getTimeRemainingString().includes('h') ? 'uniqueRed' : ''}`}>
          {getTimeRemainingString()}
          <i className='fas fa-clock' style={{ marginLeft: '5px' }}></i>
        </p>
      </div>
      <div className='uniqueName'>{auction.name}</div>
      <div className='uniquePrice'>Price: ${auction.price}</div>

      <img src={getImageFromLocalStorage(auction.image)} alt={auction.name} className='uniqueImage' />

    </div>
  );
};

export default AuctionItem;
