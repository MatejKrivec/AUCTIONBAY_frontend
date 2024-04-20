import React, { useEffect, useState } from 'react'
import '../../../assets/css/EditAuction.css';

const EditAuction = ({handleCancleEditClick, imageKey, auctionId, }: {handleCancleEditClick: () => void; imageKey: string | null; auctionId: number | null}) => {

    const [imageUploaded, setImageUploaded] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        endTime: ''
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditAuctionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const endpoint = `http://localhost:3000/auctions/${auctionId}`; // Replace with the actual endpoint URL

            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    endTime: new Date(formData.endTime).toISOString(),
                    
                    // Include other fields as needed
                })
            });

            if (!response.ok) {
                throw new Error('Failed to edit auction');
            }

            // Update local storage with the new data
            if (imageKey && image) {
                localStorage.setItem(imageKey, image);
            }

            handleCancleEditClick()


        } catch (error) {
            console.error('Error editing auction:', error);
        }
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
                    <form onSubmit={handleEditAuctionSubmit}>
                        <div className='forma'>
                            <div className='titleANDdescription'>
                                <label htmlFor="Title">Title</label>
                                <input className='titleTextInput' type="text" id="Title" name="name" onChange={handleInputChange}></input>

                                <label htmlFor="Description">Description</label>
                                <textarea id="Description" name="description" onChange={handleInputChange}></textarea>
                            </div>
                            <div className="dateDiv">
                                <label htmlFor="ExpDate">End date</label>
                                <input type="date" id="ExpDate" name="endTime" onChange={handleInputChange}></input>
                            </div>
                        </div>
                        <div className='btnContainer'>
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
