import { useState, useEffect } from 'react';
import '../../../assets/css/Won.css';
import WonAuctionItem from '../Auctions/WonAuctionItem';

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

const Won = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const userId = localStorage.getItem('UserId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      const bidsResponse = await fetch(`http://localhost:3000/bids/byUserId/${userId}`);
      if (!bidsResponse.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidsData = await bidsResponse.json();

      const auctionIds: number[] = Array.from(new Set(bidsData.map((bid: any) => bid.auctionId)));

      const auctionsResponse = await Promise.all(
        auctionIds.map(async (auctionId: number) => {
          const auctionResponse = await fetch(`http://localhost:3000/auctions/one/${auctionId}`);
          if (!auctionResponse.ok) {
            throw new Error(`Failed to fetch auction with ID ${auctionId}`);
          }
          const auction: Auction = await auctionResponse.json();
          
          if (new Date(auction.endTime) < new Date()) {
            return auction;
          }
          return null; 
        })
      );

      const filteredAuctions = auctionsResponse.filter((auction) => auction !== null) as Auction[];


      const filteredWonAuctions: (Auction | null)[] = await Promise.all(
        filteredAuctions.map(async (auction: Auction) => {
          const bidsResponse = await fetch(`http://localhost:3000/bids/byAuctionId/${auction.auctionId}`);
          if (!bidsResponse.ok) {
            throw new Error(`Failed to fetch bids for auction with ID ${auction.auctionId}`);
          }
          const auctionBids: Bid[] = await bidsResponse.json();
      
          const userBid = auctionBids.find((bid: Bid) => bid.userId === parseInt(userId || '', 10));
          if (userBid) {
            const highestBid = auctionBids.reduce((prev: Bid, current: Bid) => (prev.amount > current.amount ? prev : current));
            if (userBid.amount === highestBid.amount) {
              return auction; 
            }
          }
      
          return null; 
        })
      );
      
      const wonAuctions: Auction[] = filteredWonAuctions.filter((auction: Auction | null): auction is Auction => auction !== null);

      setAuctions(wonAuctions);
    } catch (error) {
      console.error('Error fetching bidding auctions:', error);
    }
  };

  return (
    <div>
      <main className='main'>
        <div className='auctionsContainer'>
          {auctions.map((auction) => (
            <WonAuctionItem key={auction.auctionId} auction={auction} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Won;
