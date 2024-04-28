import React, { useEffect, useState } from 'react'
import '../../../assets/css/EditAuction.css';
import { toast } from 'react-toastify';

const EditAuction = ({
    handleCancleEditClick,
    imageKey,
    auctionId,
    auctionName,
    auctionDescription,
    auctionEndDate,
  }: {
    handleCancleEditClick: () => void;
    imageKey: string | null;
    auctionId: number | null;
    auctionName: string; 
    auctionDescription: string; 
    auctionEndDate: string; 
  }) => {

    const [imageUploaded, setImageUploaded] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: auctionName, 
        description: auctionDescription, 
        endTime: auctionEndDate, 
    });

    useEffect(() => {
        if (imageKey) {
            const imageData = localStorage.getItem(imageKey);
            if (imageData) {
                setImage(imageData);
                setImageUploaded(true);
            }
        }
    }, [imageKey]);

    const handleAddImageClick = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const file = event.target.files?.[0]; 
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') { 
                setImage(reader.result);
            }
        };

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) { 
            reader.readAsDataURL(file);
            setImageUploaded(true);
        }
    }

    const handleDeleteImageClick = () => {
        setImage(null);
        setImageUploaded(false);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        const updatedValue = name === 'endTime' ? formatDate(value) : value;
        setFormData({
            ...formData,
            [name]: updatedValue
        });
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleEditAuctionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const endpoint = `http://localhost:3000/auctions/${auctionId}`; 

            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    endTime: new Date(formData.endTime).toISOString(),
                    
                })
            });

            if (!response.ok) {
                throw new Error('Failed to edit auction');
            }

            if (imageKey && image) {
                localStorage.setItem(imageKey, image);
            }

            handleCancleEditClick()


        } catch (error: any) {
            toast.error(`Error editing auction: ${error.message}`);
        }
    }

    const today = new Date();
    
   return (
        <div className="AddAuction-overlay">
            <div className="AddAuction-window">
                <div className='addAuction'>
                    <h2 className='title'>Edit auction</h2>
                    <div className='imageContainer' >
                        {imageUploaded && image !== null ? (
                            <>
                                <div className="imageWrapper">
                                    <img src={image} alt="Uploaded image" className='imagePicc' />
                                    <button className='deleteImageBtn' onClick={handleDeleteImageClick}><i className='fas fa-trash'></i></button>
                                </div>
                            </>
                        ) : (
                            <label className="UploadPictureBtn">
                                Add image
                                <input className='AddImageInput' type="file" accept="image/jpeg, image/png" onChange={handleAddImageClick} style={{ display: 'none' }}/>
                            </label>
                        )}
                    </div>
                    <form onSubmit={handleEditAuctionSubmit}>
                        <div className='forma'>
                            <div className='titleANDdescription'>
                                <label htmlFor="Title">Title</label>
                                <input className='titleTextInput' type="text" id="Title" value={formData.name} name="name" onChange={handleInputChange}></input>

                                <label htmlFor="Description">Description</label>
                                <textarea id="Description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="dateDiv">
                                <label htmlFor="ExpDate">End date</label>
                                <input type="date" id="ExpDate" name="endTime" value={formData.endTime} onChange={handleInputChange} min={today.toISOString().split('T')[0]}></input>
                            </div>
                        </div>
                        <div className='btn-Container'>
                            <button className='cancelBtn' onClick={handleCancleEditClick}>Discard changes</button>
                            <button className='EditAuctionBtn' type='submit'>Edit auction</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default EditAuction
