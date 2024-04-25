

interface Auction {
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

const MyAuctionItem = ({ auction, handleEditAuctionClick, handleDeleteAuctionClick }: { auction: Auction; handleEditAuctionClick: (auctionId: number) => void; handleDeleteAuctionClick: (auctionId: number) => void; }) => {
  const getStatus = () => {
    if (new Date() > new Date(auction.endTime)) {
      return "Done";
    } else {
      return "In Progress";
    }
  };

  const getTimeRemainingString = () => {
    if (new Date() > new Date(auction.endTime)) {
      return ""; 
    } else {
      const timeDiffMs = new Date(auction.endTime).getTime() - new Date().getTime();
      const hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60)); 
      return `${hoursRemaining}h`;
    }
  };

  const getImageFromLocalStorage = (key: string) => {
    const image = localStorage.getItem(key);
    return image ? image : ''; 
  };

  return (
    <div className='auctionItemContainer'>
      <div className='statusContainer'>
        <p className={getStatus() === 'Done' ? 'doneStatus' : 'inProgressStatus'}>{getStatus()}</p>
        {getStatus() !== 'Done' && (
          <p className='timeStatusP'>
            {getTimeRemainingString()}
            <i className='fas fa-clock' style={{ marginLeft: '5px' }}></i>
          </p>
        )}
      </div>
      <div className='nameContainer'>{auction.name}</div>
      <div className='price'>Price: ${auction.price}</div>
      <img src={getImageFromLocalStorage(auction.image)} alt={auction.name} className={getStatus() !== 'Done' ? 'imageWithButtons' : 'imageWithoutButtons'} />
      {getStatus() !== 'Done' && (
        <div className='buttonsContainer'>
          <button className='deleteBtn' onClick={() => handleDeleteAuctionClick(auction.auctionId)}>
            <i className='fas fa-trash'></i>
          </button>
          <button className='editBtn' onClick={() => handleEditAuctionClick(auction.auctionId)}>
            <i className='fas fa-edit'></i> Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAuctionItem;
