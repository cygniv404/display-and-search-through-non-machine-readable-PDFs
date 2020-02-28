import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageComponent = ({ imageIds ,selectedImages}) => {
  const [images, setImages] = useState([]);
  const url = "/images/";
  useEffect(() => {
    async function getImage(id) {
      let imageBlob;
      try {
        const response = await fetch(url + id);
        imageBlob = await response.blob();
      } catch (err) {
        return null;
      }
      return URL.createObjectURL(imageBlob);
    }

    async function getImages() {
      const imageArray = [];
      for (const id of imageIds) {
        imageArray.push(await getImage(id));
      }
      setImages(imageArray);
    }
    getImages();
  }, [imageIds]);

  return images.map((img, i) => {
    return (
      <>
        <div className={`image-container w-25-l w-50-m w-100-s pa2 relative ${selectedImages.filter((item)=>item === i+1).length > 0 ? 'active': ''}`}>
          <LazyLoadImage alt={`image-${i}`} effect="blur" src={img} />
          <Link
            to={`/SinglePage/${i + 1}`}
            className="image-link-container pa2"
          />
        </div>
      </>
    );
  });
};
export default ImageComponent;
