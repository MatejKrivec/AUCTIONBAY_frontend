import React, { useState, useEffect } from 'react';
import '../../../assets/css/MyAuctions.css';
import AddAuction from '../Auctions/AddAuction';
import EditAuction from '../Auctions/EditAuction';
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

const MyAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [addAuctionVisible, setAddAuctionVisible] = useState(false);
  const [editAuctionVisible, setEditAuctionVisible] = useState(false); // State for edit auction visibility

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

  const handleAddAuctionClick = () => {
    setAddAuctionVisible(!addAuctionVisible);
  };

  // Function to toggle the visibility of the edit auction form
  const handleEditAuctionClick = () => {
    setEditAuctionVisible(!editAuctionVisible);
  };

  const handleCancleEditClick = () => {
    setEditAuctionVisible(!editAuctionVisible);
  }

  const handleCancleAddClick = () => {
    setAddAuctionVisible(!addAuctionVisible);
  }

  return (
    <div>
      <main className='main'>
        <div className='auctionsContainer'>
          {auctions.map((auction) => (
            <AuctionItem key={auction.auctionId} auction={auction} handleEditAuctionClick={handleEditAuctionClick} /> // Pass the function to toggle edit auction visibility
          ))}
          <button className='addAuctionBtn' onClick={handleAddAuctionClick}><i className='fas fa-plus'></i></button>
        </div>
        {addAuctionVisible && (<AddAuction handleCancelAddClick={handleCancleAddClick}/>)}
        {editAuctionVisible && (<EditAuction handleCancleEditClick={handleCancleEditClick}/>)} {/* Render the EditAuction component when editAuctionVisible is true */}
      </main>
    </div>
  );
};



export default MyAuctions;
