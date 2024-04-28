import { useEffect, useState } from 'react';
import '../../../assets/css/AuctionDetails.css';
import { toast } from 'react-toastify';

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

interface AuctionDetailsProps {
  auction: Auction;
  currentPrice: number; 
  onClose: () => void;
}

interface Bid {
  bidId: number;
  userId: number;
  amount: number;
  bidDateTime:   Date;
}

interface User {
  id: number;
  username: string;
  profilePicture: string;
}

const AuctionDetails = ({ auction, currentPrice, onClose }: AuctionDetailsProps) => {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bids, setBids] = useState<Bid[]>([]);
  const [users, setUsers] = useState<{ [key: number]: User }>({});

  const [winningStatus, setWinningStatus] = useState<string>('');

  const [updatedCurrentPrice, setUpdatedCurrentPrice] = useState<number>(currentPrice);



  useEffect(() => {
   // if(!auction) return ;

    setBidAmount(updatedCurrentPrice); 
    fetchBids();
  }, [auction.auctionId, updatedCurrentPrice]); 

  const fetchBids = async () => {
    try {
      const response = await fetch(`http://localhost:3000/bids/byAuctionId/${auction.auctionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidData: Bid[] = await response.json(); 
      
      const sortedBids = [...bidData].sort((a, b) => b.amount - a.amount);
      setBids(sortedBids);

      if (sortedBids.length > 0) {
        const highestBid = sortedBids[0]; 
        const userId = localStorage.getItem('UserId');
        if (userId && parseInt(userId, 10) === highestBid.userId) {
          setWinningStatus('Winning');
        } else {
          setWinningStatus('Outbid');
        }
      }

      const userIds = sortedBids.map((bid: Bid) => bid.userId);
      const usersData: { [key: number]: User } = {};
      for (const userId of userIds) {
        const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
        if (userResponse.ok) {
          const userData: User = await userResponse.json();
          usersData[userId] = userData;
        }
      }
      setUsers(usersData);
    } catch (error: any) {
      toast.error(`Error fetching bids: ${error.message}`);
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

  const handlePlaceBid = async () => {
    const userId = localStorage.getItem('UserId') ?? "404";
    const datetime = new Date();

    if (bidAmount <= updatedCurrentPrice) { 
      
      return;
    }

   

    try {
      const patchResponse = await fetch(`http://localhost:3000/auctions/${auction.auctionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: bidAmount 
        })
      });

      if (!patchResponse.ok) {
        throw new Error('Failed to update auction price');
      }

      const bidResponse = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10), 
          auctionId: auction.auctionId,
          itemId: 456,
          amount: bidAmount,
          bidDateTime: datetime.toISOString()
        })
      });

      if (!bidResponse.ok) {
        throw new Error('Failed to place bid');
      }


      setUpdatedCurrentPrice(bidAmount);
      setBidAmount(bidAmount);
      fetchBids();
    } catch (error: any) {
      toast.error(`Error placing bid: ${error.message}`);
    }
  };

  const getStatus = () => {
    return winningStatus ; 
  };

  return (
    <>
      <div className="close-button-wrapper">
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
      <div className="auction-details-container">
        <div className="image-container">
          <img src={getImageFromLocalStorage(auction.image)} alt="Auction Item" className='auctionImage' />
        </div>
        <div className="details-container">
          <div className="description">
            <div className='status'>
              <p className={`StatusAuction ${getStatus() === 'Winning' ? 'winningStatus' : 'outbidStatus'}`}>{getStatus()}</p>
              <p className={`TimeParagraph ${getTimeRemainingString().includes('h') ? 'red' : ''}`}>
                {getTimeRemainingString()}
                <i className='fas fa-clock' style={{ marginLeft: '5px' }}></i>
              </p>
            </div>
            <h2 className='auctionTitle'>{auction.name}</h2>
            <p className='AuctionDescription'>{auction.description}</p>
            <div className='placeBidContainer'>
              <p className='BidParagraph'>Bid: </p>
              <input type="number" className='BidAmountInput' value={bidAmount} onChange={(e) => setBidAmount(parseInt(e.target.value))} />
              <button className='PlaceBidBtn' onClick={handlePlaceBid} disabled={ bidAmount <= updatedCurrentPrice}>Place bid</button>
            </div>
          </div>
          <div className="bids">
            <h2>{`Bidding history(${bids.length})`}</h2>
            <ul>
              {bids.map((bid) => (
                <li key={bid.bidId}>
                  <div className="bid-info">
                    <div className='imageANDname'>
                      <img src={getImageFromLocalStorage(users[bid.userId]?.profilePicture || '')} alt="User Profile" />
                      <p>{users[bid.userId]?.username || `User ${bid.userId}`}</p>
                    </div>
                    <div className="date-amount">
                      <p>{new Date(bid.bidDateTime).toLocaleString()}</p>
                      <p className="amount">${bid.amount}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuctionDetails;
