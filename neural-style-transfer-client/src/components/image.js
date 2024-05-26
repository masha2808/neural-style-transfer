import { useEffect } from "react";
import { useState } from "react";
import noImage from '../assets/no-image.jpg';

function Image(props) {
  const [imageUrl, setImageUrl] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    props.setImage(file);
    setImageUrl(URL.createObjectURL(file));
    event.target.value = null;
  }

  const handleChooseFromListClick = () => {
    props.setIsModalOpened(true);
  }

  useEffect(() => {
    if (props.image) {
      setImageUrl(URL.createObjectURL(props.image));
    }
  }, [props.image]);

  return (
    <div className="image">
      <h2>{props.type === "content" ? "Content image" : "Style image"}</h2>
      <img src={imageUrl || noImage} alt="style-transfer" />
      <div className="image-buttons">
        <label htmlFor={`${props.type}FileInput`} id="imageInput">Upload from device</label>
        <input type="file" id={`${props.type}FileInput`} accept="image/*" onChange={handleImageChange} />
        {props.type === "style" &&
          <button onClick={handleChooseFromListClick}>Choose from list</button>
        }
      </div>
    </div>
  );
}

export default Image;