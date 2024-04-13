import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUserAction } from "../store/auth/authActions";
import { selectUser } from "../store/auth/authSlice";
import User from "../interfaces/user";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [profileImage, setProfileImage] = useState(user?.profile_image);
  const [coverImage, setCoverImage] = useState(user?.cover_image);
  const [uploadedProfImg, setUploadedProfImg] = useState({} as Blob);
  const [uploadedCoverImg, setUploadedCoverImg] = useState({} as Blob);

  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    about: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    about: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        about: user.about || "",
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const addProfilePic = async (e: any) => {
    try {
      const file = e.target.files[0];
      const imgString: any = await convertBase64(file);
      setProfileImage(imgString);
      setUploadedProfImg(file);
    } catch (error) {}
  };
  const addcover_image = async (e: any) => {
    try {
      const file = e.target.files[0];
      const imgString: any = await convertBase64(file);
      setCoverImage(imgString);
      setUploadedCoverImg(file);
    } catch (error) {}
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = new FormData();
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    form.append("about", formData.about);
    if (uploadedProfImg.size > 0) {
      form.append("profile_image", uploadedProfImg);
    }
    if (uploadedCoverImg.size > 0) {
      form.append("cover_image", uploadedCoverImg);
    }
    dispatch(editUserAction(form));
  };

  return (
    <Box
      p={2}
      component={"form"}
      mt={3}
      display={"flex"}
      justifyContent={"center"}
      onSubmit={handleSubmit}
    >
      <Paper
        elevation={10}
        sx={{ borderRadius: 3, maxWidth: "md", width: "100%" }}
      >
        <Grid container>
          <Grid
            item
            m={"auto"}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            height={300}
            position={"relative"}
          >
            <Box
              position={"relative"}
              height={200}
              overflow={"hidden"}
              width={"100%"}
              sx={{
                backgroundColor: (theme) => `${theme.palette.primary.light}`,
                borderRadius: "12px 12px 0 0",
              }}
            >
              {coverImage && (
                <Box
                  component={"img"}
                  height={"100%"}
                  width={"100%"}
                  sx={{ objectFit: "cover_image" }}
                  src={coverImage || ""}
                />
              )}
              <IconButton
                sx={{ position: "absolute", bottom: 0, right: 0 }}
                component="label"
              >
                <PhotoCamera />
                <input
                  hidden
                  onChange={(e) => addcover_image(e)}
                  accept="image/*"
                  multiple
                  type="file"
                />
              </IconButton>
            </Box>
            <Box
              component={"img"}
              className="gelatine glow-box-blue"
              height={"200px"}
              width={"200px"}
              sx={{
                borderRadius: "100%",
                objectFit: "cover_image",
                boxShadow: (theme) => `0 0 1vh ${theme.palette.primary.main}`,
              }}
              src={profileImage}
              position={"absolute"}
              bottom={1}
            />
          </Grid>

          <Grid item p={2} xs={12}>
            <Typography color="secondary" textAlign={"center"}>Username: {user?.username}</Typography>
            <Typography color="secondary" textAlign={"center"}>Email: {user?.email}</Typography>
            <Typography textAlign={"center"} variant="h5">
              Edit your profile
            </Typography>
          </Grid>
          <Grid item p={2} xs={12} md={6}>
            <Paper sx={{ p: 1 }} square elevation={7}>
              <TextField
                fullWidth
                color="primary"
                variant="standard"
                name="first_name"
                value={formData.first_name}
                inputProps={{ maxLength: 20 }}
                onChange={handleChange}
                label="First Name"
              />
            </Paper>
          </Grid>
          <Grid item p={2} xs={12} md={6}>
            <Paper sx={{ p: 1 }} square elevation={7}>
              <TextField
                fullWidth
                color="primary"
                variant="standard"
                name="last_name"
                value={formData.last_name}
                inputProps={{ maxLength: 20 }}
                onChange={handleChange}
                label="Last Name"
              />
            </Paper>
          </Grid>
          <Grid item p={2} xs={12}>
            <Typography color={"primary"} textAlign={"center"}>
              About
            </Typography>
          </Grid>
          <Grid item p={2} xs={12}>
            <Paper sx={{ p: 1 }} square elevation={7}>
              <TextField
                fullWidth
                color="primary"
                variant="standard"
                name="about"
                multiline
                inputProps={{ maxLength: 1000 }}
                value={formData.about}
                onChange={handleChange}
                label="About"
              />
            </Paper>
          </Grid>
          <Grid item p={2} m={"auto"} xs={12} md={8} textAlign={"center"}>
            <Button fullWidth variant="outlined" component="label">
              Upload Profile profile_image
              <PhotoCamera sx={{ ml: 1 }} />
              <input
                hidden
                onChange={(e) => addProfilePic(e)}
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
          </Grid>
          <Grid item p={2} m={"auto"} xs={12} md={8} textAlign={"center"}>
            <Button fullWidth variant="contained" type="submit">
              <Typography fontWeight={600}>Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
