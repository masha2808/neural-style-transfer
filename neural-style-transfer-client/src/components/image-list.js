import styleImage1 from "../assets/style-1.jpg";
import styleImage2 from "../assets/style-2.jpg";
import styleImage3 from "../assets/style-3.jpg";
import styleImage4 from "../assets/style-4.jpg";
import styleImage5 from "../assets/style-5.jpg";
import styleImage6 from "../assets/style-6.jpg";

function ImageList(props) {
  const imageList = [
    styleImage1,
    styleImage2,
    styleImage3,
    styleImage4,
    styleImage5,
    styleImage6
  ];

  const handleImageClick = (image) => {
    props.setSelectedImage(image)
  }

  return (
    <div className="image-list">
      {imageList.map((image, index) =>
        <img 
          key={index} 
          className={props.selectedImage === image ? "selected" : ""} 
          src={image} alt="style-transfer"
          onClick={() => handleImageClick(image)}
        />
      )}
    </div>
  )
}

export default ImageList;