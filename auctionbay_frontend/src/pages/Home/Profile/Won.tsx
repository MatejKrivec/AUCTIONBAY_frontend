import React, { useState, useEffect } from 'react';
import '../../../assets/css/Won.css';

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

const AuctionItem = ({ auction }: { auction: Auction }) => {
  const getStatusString = () => {
    return 'done';
  };


  return (
    <div className='auctionItem'>
      <div className='status'>
        <p>{getStatusString()}</p>
      </div>
      <div className='name'>{auction.name}</div>
      <div className='price'>Price: ${auction.price}</div>
      <img src={auction.image} alt={auction.name} className='image' />
    </div>
  );
};

const Won = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await fetch('http://localhost:3000/auctions');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setAuctions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <main className='main'>
        <div className='auctionsContainer'>
          {auctions.map((auction) => (
            <AuctionItem key={auction.auctionId} auction={auction} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Won;
