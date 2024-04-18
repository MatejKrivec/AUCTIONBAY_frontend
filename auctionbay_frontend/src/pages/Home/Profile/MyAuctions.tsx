import React, { useState, useEffect } from 'react';
import '../../../assets/css/MyAuctions.css';
import AddAuction from '../Auctions/AddAuction';
import EditAuction from '../Auctions/EditAuction';
import AuctionItem from '../Auctions/AuctionItem';
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
  startTime: string;
  endTime: string;
}

interface Props {
  onUsernameReceived: (username: string) => void;
}

const MyAuctions = ({ onUsernameReceived }: Props) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [addAuctionVisible, setAddAuctionVisible] = useState(false);
  const [editAuctionVisible, setEditAuctionVisible] = useState(false); // State for edit auction visibility

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    //console.log('toukeen:  '+token)
    
    try {
      const response = await fetch('http://localhost:3000/decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to decode token');
      }
      
      const userData = await response.json();
     // console.log('User data:', userData); // Log the entire userData object
      const userId = userData.id;
      const userNAME = userData.username;

      localStorage.setItem('UserId', userId);

      onUsernameReceived(userNAME);
      
     // console.log('User id:', userId);
     // console.log('UserName:', userNAME);
  
      // Now you can use the decoded user ID to fetch auctions
      const auctionsResponse = await fetch(`http://localhost:3000/auctions/${userId}`);
      if (!auctionsResponse.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const auctionsData = await auctionsResponse.json();
      //console.log(auctionsData);
      // Check if auctionsData is an object, and if so, convert it to an array
      const auctionsArray = Array.isArray(auctionsData) ? auctionsData : [auctionsData];
      setAuctions(auctionsArray);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddAuctionClick = () => {
    setAddAuctionVisible(!addAuctionVisible);
  };

  const handleEditAuctionClick = () => {
    setEditAuctionVisible(!editAuctionVisible);
  };

  const handleCancleEditClick = () => {
    setEditAuctionVisible(!editAuctionVisible);
  }

  const handleCancleAddClick = () => {
    setAddAuctionVisible(!addAuctionVisible);
  }

  const handleDeleteAuctionClick = async (auctionId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/auctions/${auctionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete auction');
      }


      // Delete the image data from local storage
      const auctionToDelete = auctions.find(auction => auction.auctionId === auctionId);
      if (!auctionToDelete) {
        throw new Error('Auction not found');
      }
      localStorage.removeItem(auctionToDelete.image);

      window.location.reload();
      // Optionally, you might want to refresh the list of auctions after deletion
      // Implement your logic here to update the UI accordingly
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
              <AuctionItem key={auction.auctionId} auction={auction} handleEditAuctionClick={handleEditAuctionClick} handleDeleteAuctionClick={handleDeleteAuctionClick}/>
            ))
          ) : (
            <p>No auctions available</p>
          )}
          <button className='addAuctionBtn' onClick={handleAddAuctionClick}><i className='fas fa-plus'></i></button>
        </div>
        {addAuctionVisible && (<AddAuction handleCancelAddClick={handleCancleAddClick}/>)}
        {editAuctionVisible && (<EditAuction handleCancleEditClick={handleCancleEditClick}/>)}
      </main>
    </div>
  );
};



export default MyAuctions;
