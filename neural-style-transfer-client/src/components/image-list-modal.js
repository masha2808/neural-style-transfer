import { useEffect, useState } from "react";
import ImageList from "./image-list";

function ImageListModal(props) {
  const [selectedImage, setSelectedImage] = useState();
  const [imageFile, setImageFile] = useState('');

  const handleSelectClick = () => {
    props.setStyleImage(imageFile);
    props.setIsModalOpened(false);
  }
  
  const handleCancelClick = () => {
    props.setIsModalOpened(false);
  }

  useEffect(() => {
    if (selectedImage) {
      // Convert the selected image to a File object
      const convertToFile = async (imagePath) => {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        const file = new File([blob], imagePath.split('/').pop(), { type: blob.type });
        setImageFile(file);
      };

      convertToFile(selectedImage);
    }
  }, [selectedImage]);

  return (
    <div className="image-list-modal-wrapper">
      <div className="image-list-modal">
        <ImageList selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        <div className="image-list-buttons">
          {selectedImage && <button onClick={handleSelectClick}>Select</button>}
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ImageListModal;