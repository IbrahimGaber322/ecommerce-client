import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";

import prod1 from "../Pictures/image-product-1.jpg";
import prod2 from "../Pictures/image-product-2.jpg";
import prod3 from "../Pictures/image-product-3.jpg";
import prod4 from "../Pictures/image-product-4.jpg";

import thumb1 from "../Pictures/image-product-1-thumbnail.jpg";
import thumb2 from "../Pictures/image-product-2-thumbnail.jpg";
import thumb3 from "../Pictures/image-product-3-thumbnail.jpg";
import thumb4 from "../Pictures/image-product-4-thumbnail.jpg";

const IMAGES: string[] = [prod1, prod2, prod3, prod4];
const THUMBS: string[] = [thumb1, thumb2, thumb3, thumb4];

const Gallery: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>(prod1);
  const [currentPassedImage, setCurrentPassedImage] = useState<string>(prod1);

  const [open, setOpen] = useState<boolean>(false);
  
  const handleClick = (index: number) => {
    setCurrentImage(IMAGES[index]);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeActivatedClass = (parent: Element | null) => {
    if (parent) {
      Array.from(parent.children).forEach((childNode) => {
        const element = childNode as HTMLElement;
        if (element.classList.contains("activated")) {
          element.classList.remove("activated");
        }
      });
    }
  };

  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          <img src={currentImage} alt="product-1" onClick={handleToggle} />
        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
        />
        <div className="thumbnails">
          {THUMBS.map((th, index) => (
            <div
              className="img-holder"
              key={index}
              onClick={(e) => {
                handleClick(index);
                removeActivatedClass(e.currentTarget.parentNode as Element);
                (e.currentTarget.childNodes[0] as HTMLElement).classList.toggle("activated");
              }}
            >
              <div className={`outlay ${index === 0 ? "activated" : ""}`}></div>
              <img src={th} alt={`product-${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
