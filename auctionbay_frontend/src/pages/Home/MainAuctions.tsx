import React, { useState, useEffect } from 'react';
import '../../assets/css/MainAuctions.css';
import AuctionDetails from './Auctions/AuctionDetails'; // Import the AuctionDetails component
import AuctionItem from './Auctions/AuctionItem';

/*interface ImageData {
  type: string;
  data: number[]; // Assuming the image data is an array of numbers representing the buffer data
}*/

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
      setAuctions(auctionsArray);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAuctionClick = (auction: Auction) => {
    setSelectedAuction(auction); 
  };

  return (
    <div>
      {selectedAuction ? (
        <AuctionDetails auction={selectedAuction}  />
      ) : (
        <div className='main'>
          <div className='HelloUserText'>
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
