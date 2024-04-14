import Ibrahim from "../../assets/images/Ibrahim.jpg";
import Alaa from "../../assets/images/Alaa.jpg";
import Seif from "../../assets/images/Seif.jpg";
import Youssef from "../../assets/images/Youssef.jpg";
import Carousel from "react-multi-carousel";
import responsive from "./responsive";
import { Box, Typography } from "@mui/material";

const testimonials = [
  {
    name: "Ibrahim",
    image: Ibrahim,
    testimony: "One of the best websites I have ever seen.",
  },
  { name: "Alaa", image: Alaa, testimony: "I love this website." },
  {
    name: "Seif",
    image: Seif,
    testimony: "I love the design of this website.",
  },
  { name: "Youssef", image: Youssef, testimony: "Very easy to use." },
];

const Testimonials = () => {
  return (
    <Box sx={{ mt: "2rem", p: "1rem" }}>
      <Carousel responsive={responsive} infinite={true}>
        {testimonials?.map((testimonial, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                margin: "1rem",
                ":hover": {
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
              <Typography variant="h6" align="center">
                {testimonial.name}
              </Typography>
              <Typography variant="body1" align="center">
                {testimonial.testimony}
              </Typography>
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Testimonials;
