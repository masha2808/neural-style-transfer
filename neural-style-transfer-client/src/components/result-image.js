function resultImage(props) {
  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${props.resultImage}`;
    link.download = 'stylized_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="result-image">
      <h2>Result image</h2>
      <img src={`data:image/jpeg;base64,${props.resultImage}`} alt="style-transfer" />
      <button className="image-button" onClick={handleDownloadClick}>Download</button>
    </div>
  );
}

export default resultImage;