import React, { useState, useEffect } from 'react';
import '../../../assets/css/Bidding.css';
import BiddingAuctionItem from '../Auctions/BiddingAuctionItem';
import AuctionItem from '../Auctions/AuctionItem';

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

const Bidding = () => {
  const [biddingAuctions, setBiddingAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    fetchBiddingAuctions();
  }, []);

  const fetchBiddingAuctions = async () => {
    try {
      const userId = localStorage.getItem('UserId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      // Fetch bids associated with the user's ID
      const bidsResponse = await fetch(`http://localhost:3000/bids/byUserId/${userId}`);
      if (!bidsResponse.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidsData = await bidsResponse.json();

      // Extract unique auction IDs from the bids
      const auctionIds: number[] = Array.from(new Set(bidsData.map((bid: any) => bid.auctionId)));

      // Fetch auctions corresponding to the auction IDs
      const auctionsResponse = await Promise.all(
        auctionIds.map(async (auctionId: number) => {
          const auctionResponse = await fetch(`http://localhost:3000/auctions/one/${auctionId}`);
          if (!auctionResponse.ok) {
            throw new Error(`Failed to fetch auction with ID ${auctionId}`);
          }
          return auctionResponse.json();
        })
      );

      // Filter out auctions whose endTime has already passed
      const filteredAuctions = auctionsResponse.filter(auction => new Date(auction.endTime) > new Date());

      filteredAuctions.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
      
      // Set the fetched auctions to state
      setBiddingAuctions(filteredAuctions);
    } catch (error) {
      console.error('Error fetching bidding auctions:', error);
    }
  };

  return (
    <div>
      <main className='main'>
        <div className='auctionsContainer'>
          {biddingAuctions.map((auction) => (
            <BiddingAuctionItem key={auction.auctionId} auction={auction} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Bidding;
