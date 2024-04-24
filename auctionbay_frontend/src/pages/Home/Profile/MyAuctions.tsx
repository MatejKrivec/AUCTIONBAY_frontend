import React, { useState, useEffect } from 'react';
import '../../../assets/css/MyAuctions.css';
import AddAuction from '../Auctions/AddAuction';
import EditAuction from '../Auctions/EditAuction';
import MyAuctionItem from '../Auctions/MyAuctionItem';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface Auction {
  userId: number;
  auctionId: number;
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  maxPrice: number;
  price: number;
  startTime: Date;
  endTime: Date;
}


const MyAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [addAuctionVisible, setAddAuctionVisible] = useState(false);
  const [editAuctionVisible, setEditAuctionVisible] = useState(false); // State for edit auction visibility
  const [editImageKey, setEditImageKey] = useState<string | null>(null); // State for storing image key of the auction being edited
  const [editAuctionId, setEditAuctionId] = useState<number | null>(null); // State for storing the ID of the auction being edited
 /* const [editAuctionName, setEditAuctionName] = useState<string | null>(null);
  const [editAuctionDescription, setEditAuctionDescription] = useState<string  | null>(null);
  const [editAuctionEndTime, setEditAuctionEndTime] = useState<string | null>(null);*/


  useEffect(() => {
    fetchAuctions();
  }, );

  const fetchAuctions = async () => {
    try {
      const userId = localStorage.getItem('UserId');
  
      const auctionsResponse = await fetch(`http://localhost:3000/auctions/${userId}`);
      if (!auctionsResponse.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const auctionsData = await auctionsResponse.json();

      const auctionsArray = Array.isArray(auctionsData) ? auctionsData : [auctionsData];

      auctionsArray.sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());

      setAuctions(auctionsArray);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddAuctionClick = () => {
    setAddAuctionVisible(!addAuctionVisible);
  };

  const handleEditAuctionClick = (auctionId: number) => {
    setEditAuctionVisible(true);
    const auctionToEdit = auctions.find(auction => auction.auctionId === auctionId);
    if (auctionToEdit) {
      setEditImageKey(auctionToEdit.image);
      setEditAuctionId(auctionId);
    }
  };

  const handleCancleEditClick = () => {
    setEditAuctionVisible(!editAuctionVisible);
    //window.location.reload();
  }

  const handleCancleAddClick = () => {
    setAddAuctionVisible(!addAuctionVisible);
   // window.location.reload();
  }

  const handleDeleteAuctionClick = async (auctionId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/auctions/${auctionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete auction');
      }

      const auctionToDelete = auctions.find(auction => auction.auctionId === auctionId);
      if (!auctionToDelete) {
        throw new Error('Auction not found');
      }
      localStorage.removeItem(auctionToDelete.image);

     // window.location.reload();

    } catch (error) {
      console.error('Error deleting auction:', error);
    }
  };

  return (
    <div>
      
      <main className='main'>
        <div className='auctionsContainer'>
          {Array.isArray(auctions) ? (
            auctions.map((auction) => (
              <MyAuctionItem key={auction.auctionId} auction={auction} handleEditAuctionClick={handleEditAuctionClick} handleDeleteAuctionClick={handleDeleteAuctionClick}/>
            ))
          ) : (
            <p>No auctions available</p>
          )}
          <button className='addAuctionBtn' onClick={handleAddAuctionClick}><i className='fas fa-plus'></i></button>
        </div>
        {addAuctionVisible && (<AddAuction handleCancelAddClick={handleCancleAddClick}/>)}
        {editAuctionVisible && (<EditAuction handleCancleEditClick={handleCancleEditClick} imageKey={editImageKey} auctionId={editAuctionId}/>)}
      </main>
    </div>
  );
};

export default MyAuctions;
