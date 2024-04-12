import { Grid, Typography } from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StorefrontIcon from "@mui/icons-material/Storefront";
import XIcon from '@mui/icons-material/X';
import { Link } from "react-router-dom";

export default function Footer({dark}:{dark:boolean}) {
  return (
    <Grid container spacing={2} sx={{
        height: '200px',
        backgroundColor: `${dark? "background.paper":"primary.main"}`,
        padding: '2rem',
    }}>
        <Grid item xs={4} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <StorefrontIcon fontSize='large' sx={{ display: { xs: "none", md: "flex" }, mr: 1 , color: 'white'}} />
            <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",

            }}
          >
            Bazaar
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h1>Contact Us</h1>
        </Grid>
        <Grid item xs={4} sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
        }}>
            <span style={{width: '50%', display: 'flex', justifyContent: 'space-evenly'}}>
                <a href="https://github.com/IbrahimGaber322/ecommerce-client">
                    <GitHubIcon fontSize='large' htmlColor='white'/>
                </a>
                <a href="https://www.linkedin.com/in/ibrahim-gaber-seda/">
                    <LinkedInIcon fontSize='large' htmlColor='white'/>
                </a>
                <a href="https://twitter.com/">
                    <XIcon fontSize='large' htmlColor='white'/>
                </a>
            </span>
            
        </Grid>
  </Grid>
  )
}
