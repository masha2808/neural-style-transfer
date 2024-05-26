import { useState } from "react";
import axios from 'axios';
import Image from "./image";
import ResultImage from "./result-image";
import ImageListModal from "./image-list-modal";
import Loader from "./loader";

function StyleTransferPage() {
  const [contentImage, setContentImage] = useState();
  const [styleImage, setStyleImage] = useState();
  const [resultImage, setResultmage] = useState();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunStyleTransferClick = () => {
    const formData = new FormData();
    formData.append('content_image', contentImage);
    formData.append('style_image', styleImage);

    setIsLoading(true);

    axios.post("http://localhost:5000/stylize-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(response => {
        console.log('Image uploaded successfully:', response.data);
        setResultmage(response?.data?.stylized_image)
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="style-transfer-page">
      <div className="images">
        <Image image={contentImage} setImage={setContentImage} type="content" />
        <Image image={styleImage} setImage={setStyleImage} type="style" setIsModalOpened={setIsModalOpened} />
      </div>
      {(contentImage && styleImage) && 
        <button className="run-button" onClick={handleRunStyleTransferClick}>
          Run Neural Style Transfer
        </button>
      }
      {resultImage && <ResultImage resultImage={resultImage} />}
      {isModalOpened && <ImageListModal setIsModalOpened={setIsModalOpened} setStyleImage={setStyleImage} styleImage={styleImage} />}
      {isLoading && <Loader />}
    </div>
  )
}

export default StyleTransferPage;