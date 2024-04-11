import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

import prod1 from "../Pictures/image-product-1.jpg";
import prod2 from "../Pictures/image-product-2.jpg";
import prod3 from "../Pictures/image-product-3.jpg";
import prod4 from "../Pictures/image-product-4.jpg";
import NextIcon from "../Icons/NextIcon";
import PreviousIcon from "../Icons/PreviousIcon";
import Product from "../../interfaces/Product";
import RenderStockStatus from "../ui/RenderStock";

const MobileGallery = ({ product }: { product: Product | null }) => {
  const IMAGES = product?.images?.map((image) => image.image_url) || [];
  const [currentMobileImage, setCurrentMobileImage] = useState<string>(
    IMAGES[0]
  );
  const [mobileImageIndex, setMobileImageIndex] = useState<number>(0);

  const handleIncrement = () => {
    if (mobileImageIndex === IMAGES.length - 1) {
      setCurrentMobileImage(IMAGES[0]);
      setMobileImageIndex(0);
    } else {
      setCurrentMobileImage(IMAGES[mobileImageIndex + 1]);
      setMobileImageIndex(mobileImageIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (mobileImageIndex === 0) {
      setCurrentMobileImage(IMAGES[IMAGES.length - 1]);
      setMobileImageIndex(IMAGES.length - 1);
    } else {
      setCurrentMobileImage(IMAGES[mobileImageIndex - 1]);
      setMobileImageIndex(mobileImageIndex - 1);
    }
  };

  return (
    <section className="mobile-gallery hide-in-desktop">
      <IconButton
        className="icon-button-prev"
        disableRipple
        onClick={handleDecrement}
        sx={{
          height: "42px",
          width: "42px",
          bgcolor: "#fff",
          zIndex: 1,
        }}
      >
        <PreviousIcon />
      </IconButton>
      <Box sx={{position:"relative", width:400, mx:"auto"}}>
        <img src={currentMobileImage} alt="featured-product" />
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <RenderStockStatus product={product} />
        </div>
      </Box>
      <IconButton
        className="icon-button-next"
        disableRipple
        onClick={handleIncrement}
        sx={{
          height: "42px",
          width: "42px",
          bgcolor: "#fff",
          zIndex: 1,
        }}
      >
        <NextIcon />
      </IconButton>
    </section>
  );
};

export default MobileGallery;
