import React, { useState } from 'react'
import '../../../assets/css/EditAuction.css';

const EditAuction = ({handleCancleEditClick}: {handleCancleEditClick: () => void}) => {

    const [imageUploaded, setImageUploaded] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const handleAddImageClick = (event: React.ChangeEvent<HTMLInputElement>) => { // Change event type to React.ChangeEvent<HTMLInputElement>
        const file = event.target.files?.[0]; // Use optional chaining
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') { // Check if reader.result is string
                setImage(reader.result);
            }
        };

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) { // Check file type
            reader.readAsDataURL(file);
            setImageUploaded(true);
        }
    }

    const handleDeleteImageClick = () => {
        setImage(null);
        setImageUploaded(false);
    }
    
  return (
    <div className="AddAuction-overlay">
     <div className="AddAuction-window">
        <div className='addAuction'>
            <h2 className='title'>Edit auction</h2>
            <div className='imageContainer' >
                {imageUploaded ? (
                    <>
                        {image && <img src={image} alt="Uploaded image" className='imagePic' />}
                         <button className='deleteImageBtn' onClick={handleDeleteImageClick}><i className='fas fa-trash'></i></button>
                    </>
                    ) : (
                        <input className='AddImageInput' type="file" accept="image/jpeg, image/png" onChange={handleAddImageClick} />
                )}
            </div>
            <div className='forma'>
                <div className='titleANDdescription'>
                    <label htmlFor="Title">Title</label>
                    <input className='titleTextInput' type="text" id="Title" name="Title"></input>

                    <label htmlFor="Description">Description</label>
                    <textarea id="Description" name="Description"></textarea>
                </div>
                <div className="dateDiv">
                    <label htmlFor="ExpDate">End date</label>
                    <input type="date" id="ExpDate" name="ExpDate"></input>
                </div>
            </div>
            <div className='btnContainer'>
                <button className='cancelBtn' onClick={handleCancleEditClick}>Discard changes</button>
                <button className='EditAuctionBtn'>Edit auction</button>
            </div>
        </div>
     </div>
    </div>
  )
}

export default EditAuction
