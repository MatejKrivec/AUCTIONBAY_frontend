import React, { useEffect, useState } from 'react';
import '../../../assets/css/AuctionDetails.css';

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

const AuctionDetails = ({ auction }: AuctionDetailsProps) => {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bids, setBids] = useState<Bid[]>([]);
  const [users, setUsers] = useState<{ [key: number]: User }>({});

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      
      const response = await fetch(`http://localhost:3000/bids/${auction.auctionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidData: Bid[] = await response.json(); // Define bidData properly
      setBids(bidData);

      // Fetch user data for each bid
      const userIds = bidData.map((bid: Bid) => bid.userId);
      const usersData: { [key: number]: User } = {};
      for (const userId of userIds) {
        const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
        if (userResponse.ok) {
          const userData: User = await userResponse.json();
          usersData[userId] = userData;
        }
      }
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };
  
  const getImageFromLocalStorage = (key: string) => {
    
    const image = localStorage.getItem(key);
    return image ? image : ''; 
  };

  const handlePlaceBid = async () => {

    const userId = localStorage.getItem('UserId') ?? "404";
    const datetime = new Date();

    try {
      const response = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10), // Change this to the actual user ID
          auctionId: auction.auctionId,
          itemId: 456, // Change this to the actual item ID
          amount: bidAmount,
          bidDateTime: datetime.toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to place bid');
      }

      // Optionally, you can handle success and update the UI
      console.log('Bid placed successfully');
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <div className="auction-details-container">
      <div className="image-container">
        <img src={getImageFromLocalStorage(auction.image)} alt="Auction Item" className='auctionImage' />
      </div>
      <div className="details-container">
        <div className="description">
          <div className='status'>
              <p className='StatusParagraph'>status</p>
              <p className='TimeParagraph'>time</p>
          </div>
          <h2 className='auctionTitle'>{auction.name}</h2>
          <p>{auction.description}</p>
          <div className='placeBidContainer'>
            <p className='BidParagraph'>Bid: </p>
            <input type="number" className='BidAmountInput' value={bidAmount} onChange={(e) => setBidAmount(parseInt(e.target.value))} />
            <button className='PlaceBidBtn' onClick={handlePlaceBid}>Place bid</button>
          </div>
        </div>
        <div className="bids">
          <h2>Bids</h2>
          <ul>
            {bids.map((bid) => (
              <li key={bid.bidId}>
                <img src={getImageFromLocalStorage(users[bid.userId]?.profilePicture || '')} alt="User Profile" />
                {`${users[bid.userId]?.username || `User ${bid.userId}`} on ${new Date(bid.bidDateTime).toLocaleString()}: $${bid.amount}`}
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuctionDetails;
