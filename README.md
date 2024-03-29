# Bazaar (ecommerce front-end)

Welcome to the frontend repository of our Bazaar project! This repository contains the frontend implementation of our web application, built with React, TypeScript, and Material-UI. Below is a guide to help you understand the structure of the project and how to set it up locally.

## Project Structure
<p>
bazaar-client/<br>
├── public/ # Static files<br>
├── src/ # Source files<br>
│ ├── assets/ # Images and other assets<br>
│ ├── components/ # Reusable components<br>
|&nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; |── ui/ # Reusable UI components<br>            
│ ├── pages/ # Application pages<br>
│ ├── services/ <br>
|&nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; |── api/ # API services<br>
|&nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; |── redux/ # Redux store, slices and actions<br>
│ ├── theme/ # Material-UI theme configuration<br>
|&nbsp; &nbsp; |── util/ # Unique files<br>
│ ├── App.tsx # Main application component<br>
│ └── index.tsx # Entry point<br>
├── .gitignore # Git ignore file<br>
├── package.json # Node.js dependencies and scripts<br>
├── README.md # This file<br>
└── tsconfig.json # TypeScript configuration<br>
</p>
