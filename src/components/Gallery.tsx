import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";
import Product from "../interfaces/Product";
import Image from "../interfaces/Image";
import { useSelector } from "react-redux";
import { selectProductLoading } from "../store/product/productSlice";
import RenderStockStatus from "./RenderStock";
interface GalleryProps {
  product: Product | null;
}

const Gallery: React.FC<GalleryProps> = ({ product }) => {
  const images = product?.images?.map((image) => image.image_url) || [];
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [currentPassedImage, setCurrentPassedImage] = useState<string>(
    images[0]
  );
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (index: number) => {
    setCurrentImage(images[index]);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeActivatedClass = (
    parent: Element | null,
    currentIndex: number
  ) => {
    if (parent) {
      Array.from(parent.children).forEach((childNode, i) => {
        const element = childNode as HTMLElement;
        if (i !== currentIndex) {
          element.classList.remove("activated");
        }
      });
      parent.children[currentIndex].classList.toggle("activated");
    }
  };

  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  return (
    <div className="gallery-holder hide-in-mobile">
      <div className="gallery">
        <div className="image" style={{ position: "relative" }}>
          <img src={currentImage} alt={"product"} onClick={handleToggle} />
          <div style={{ position: "absolute", top: 0, right: 0 }}>
            <RenderStockStatus product={product} />
          </div>
        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
          images={images}
        />
        <div className="thumbnails">
          {images?.map((image, index) => (
            <div
              className={`img-holder ${
                currentImage === image ? "activated" : ""
              }`}
              key={index}
              onClick={(e) => {
                handleClick(index);
                removeActivatedClass(
                  e.currentTarget.parentNode as Element,
                  index
                );
              }}
            >
              <div className="outlay"></div>
              <img src={image} alt={`product-${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
