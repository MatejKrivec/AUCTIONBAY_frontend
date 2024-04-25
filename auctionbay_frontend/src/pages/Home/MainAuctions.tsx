import React, { useState, useEffect } from 'react';
import '../../assets/css/MainAuctions.css';
import AuctionDetails from './Auctions/AuctionDetails'; 
import AuctionItem from './Auctions/AuctionItem';


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

const MainAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null); 

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleAuctionClick = (auction: Auction) => {
    setSelectedAuction(auction); 
  };

  const handleCloseAuctionDetails = () => {
    setSelectedAuction(null); 
  };

  const fetchAuctions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    
    try {
     
      const userId = localStorage.getItem('UserId');

  
      const auctionsResponse = await fetch(`http://localhost:3000/auctions/akcije/${userId}`);
      if (!auctionsResponse.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const auctionsData = await auctionsResponse.json();

      const auctionsArray = Array.isArray(auctionsData) ? auctionsData : [auctionsData];

      const filteredAuctions = auctionsArray.filter(auction => new Date(auction.endTime) > new Date());

      filteredAuctions.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
      
      setAuctions(filteredAuctions);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {selectedAuction ? (
        <AuctionDetails auction={selectedAuction}  currentPrice={selectedAuction.price} onClose={handleCloseAuctionDetails}/>
      ) : (
        <div className='main'>
          <div className='AuctionsText'>
            <h1>Auctions</h1>
          </div>
          <div className='auctionsContainer'>
            {auctions.map(auction => (
              <AuctionItem key={auction.auctionId} auction={auction} onClick={() => handleAuctionClick(auction)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainAuctions;
