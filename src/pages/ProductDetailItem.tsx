import React, { useState } from 'react';
import Gallery from "../components/Gallery";
import MobileGallery from "../components/MobileGallery";
import Description from "../components/Description";
import { Container } from "@mui/material";

const ProductDetailItem: React.FC = () => {
  const [quant, setQuant] = useState<number>(0);
  const [orderedQuant, setOrderedQuant] = useState<number>(0);

  const addQuant = () => {
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setQuant(quant - 1);
  };

  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };

  return (
    <Container component="section" maxWidth={"lg"}>
      <section className="core">
        <Gallery />
        <MobileGallery />
        <Description 
          quant={quant}
          addQuant={addQuant}
          removeQuant={removeQuant}
          setOrderedQuant={setOrderedQuant}
        />
      </section>
    </Container>
  );
};

export default ProductDetailItem;
