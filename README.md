# Bazaar (ecommerce front-end)

Welcome to the frontend repository of our Bazaar project! This repository contains the frontend implementation of our web application, built with React, TypeScript, and Material-UI. Below is a guide to help you understand the structure of the project and how to set it up locally.

## Project Structure

bazaar-client/
├── public/ # Static files
├── src/ # Source files
│ ├── assets/ # Images and other assets
│ ├── components/ # Reusable components
| |  |── ui/ # Reusable UI components            
│ ├── pages/ # Application pages
│ ├── services/ 
| |  |── api/ # API services
| |  |── redux/ # Redux store, slices and actions
│ ├── theme/ # Material-UI theme configuration
| |── util/ # Unique files
│ ├── App.tsx # Main application component
│ └── index.tsx # Entry point
├── .gitignore # Git ignore file
├── package.json # Node.js dependencies and scripts
├── README.md # This file
└── tsconfig.json # TypeScript configuration

