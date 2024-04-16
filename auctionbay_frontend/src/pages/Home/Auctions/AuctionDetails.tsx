import React from 'react';
import '../../../assets/css/AuctionDetails.css';

const AuctionDetails = () => {
  return (
    <div className="auction-details-container">
      <div className="image-container">
        <img src="your-image-url.jpg" alt="Auction Item" />
      </div>
      <div className="details-container">
        <div className="description">
          <h2>Description</h2>
          <p>This is where the description of the auction item will be displayed.</p>
        </div>
        <div className="bids">
          <h2>Bids</h2>
          <ul>
            {/* Render list of bids here */}
            <li>First Bid: $100</li>
            <li>Second Bid: $120</li>
            {/* Add more bids dynamically */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuctionDetails;
