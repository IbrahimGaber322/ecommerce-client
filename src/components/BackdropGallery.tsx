import React, { useState, useEffect } from "react";
import { Backdrop, IconButton } from "@mui/material";
import CloseIcon from "./Icons/CloseIcon";
import PreviousIcon from "./Icons/PreviousIcon";
import NextIcon from "./Icons/NextIcon";

interface BackdropGalleryProps {
  open: boolean;
  handleClose: () => void;
  currentPassedImage: string;
  images: string[];
}

const BackdropGallery: React.FC<BackdropGalleryProps> = ({
  open,
  handleClose,
  currentPassedImage,
  images,
}) => {
  const [backdropImage, setBackdropImage] = useState<string>(currentPassedImage);
  const [currentPassedImageIndex, setCurrentPassedImageIndex] = useState<number>(1);

  useEffect(() => {
    setBackdropImage(currentPassedImage);
    images.forEach((img, index) => {
      if (img === currentPassedImage) setCurrentPassedImageIndex(index);
    });
  }, [currentPassedImage, images]);

  const handleClick = (index: number | null) => {
    if (index !== null) {
      setBackdropImage(images[index]);
      setCurrentPassedImageIndex(index);
    }
  };

  const handleIncrement = () => {
    const nextIndex = (currentPassedImageIndex + 1) % images.length;
    setBackdropImage(images[nextIndex]);
    setCurrentPassedImageIndex(nextIndex);
  };

  const handleDecrement = () => {
    const prevIndex = (currentPassedImageIndex - 1 + images.length) % images.length;
    setBackdropImage(images[prevIndex]);
    setCurrentPassedImageIndex(prevIndex);
  };

  const removeActivatedClass = (parent: Element | null) => {
    if (parent) {
      Array.from(parent.children).forEach((childNode) => {
        const element = childNode as HTMLElement;
        if (element.childNodes[0] instanceof HTMLElement && element.childNodes[0].classList.contains("activated")) {
          element.childNodes[0].classList.remove("activated");
        }
      });
    }
  };

  return (
    <Backdrop
      className="backdrop"
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <section className="backdrop-content">
        <IconButton
          onClick={handleClose}
          sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
        >
          <CloseIcon fillColor={"#fff"} />
        </IconButton>
        <div className="image">
          <IconButton
            className="icon-button-prev"
            disableRipple
            onClick={() => {
              handleDecrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <PreviousIcon />
          </IconButton>
          <IconButton
            className="icon-button-next"
            disableRipple
            onClick={() => {
              handleIncrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NextIcon />
          </IconButton>
          <img
            src={backdropImage}
            alt="selected-product"
            style={{ cursor: "auto" }}
          />
        </div>
        <div className="thumbnails">
          {images.map((image, index) => (
            <div
              className="img-holder-backd"
              key={index}
              onClick={(e) => {
                handleClick(index);
                removeActivatedClass(e.currentTarget.parentNode as Element);
                (e.currentTarget.childNodes[0] as HTMLElement).classList.toggle("activated");
              }}
            >
              <div
                className={`outlay ${
                  index === currentPassedImageIndex ? "activated" : ""
                }`}
              ></div>
              <img src={image} alt={`product-${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </Backdrop>
  );
};

export default BackdropGallery;
