import React, { useState, useEffect } from 'react';
import '../../assets/css/MainAuctions.css';
import AuctionDetails from './Auctions/AuctionDetails'; // Import the AuctionDetails component

interface ImageData {
  type: string;
  data: number[]; // Assuming the image data is an array of numbers representing the buffer data
}

interface Auction {
  auctionId: number;
  name: string;
  description: string;
  image: ImageData;
  startingPrice: number;
  maxPrice: number;
  price: number;
  startTime: string;
  endTime: string;
}

const convertByteaToBase64 = (bufferData: number[]) => {
  return String.fromCharCode.apply(null, bufferData);
};

const AuctionItem = ({ auction, onClick }: { auction: Auction, onClick: () => void }) => {
  const getStatusString = () => {
    return 'status'
  };

  const getTimeRemainingString = () => {
    return 'time'
  };

  const imageData = auction.image ? `data:${auction.image.type};base64,${convertByteaToBase64(auction.image.data)}` : '';

  return (
    <div className='auctionItem' onClick={onClick}>
      <div className='status'>
        <p>{getStatusString()}</p>
        <p>{getTimeRemainingString()}</p>
      </div>
      <div className='name'>{auction.name}</div>
      <div className='price'>Price: ${auction.price}</div>
      <div className='ImageContainer'>
        <img src={imageData} alt={auction.name}  className='imagePic'/>
      </div>
    </div>
  );
};

const MainAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null); // State to manage selected auction

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

  const handleAuctionClick = (auction: Auction) => {
    setSelectedAuction(auction); // Set selected auction when clicked
  };

  return (
    <div>
      {selectedAuction ? (
        <AuctionDetails  />
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
