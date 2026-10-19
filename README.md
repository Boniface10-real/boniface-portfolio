Boniface Chikomo — Cyber Security Portfolio

A personal portfolio website built to showcase my background, skills, projects, and professional interests as a Cyber Security student at Mulungushi University, Zambia.

Features

- View portfolio information
- Display skills and projects
- Create portfolio records
- Update existing records
- Delete portfolio records
- REST API built with Node.js and Express
- SQLite database for storing portfolio information

Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- SQLite
- Git and GitHub

Project Structure

boniface-portfolio/
├── backend/
│   ├── db.js
│   ├── schema.sql
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .gitignore
└── README.md

Running the Project Locally

1. Requirements

Install Node.js and npm on your computer.

2. Install backend dependencies

Open a terminal in the project folder and run:

cd backend
npm install

3. Start the API

npm start

The API should run at:

"http://localhost:3000"

4. Open the frontend

Open "frontend/index.html" in your browser, or use the local frontend setup configured for this project.

API Endpoints

Method| Endpoint| Purpose
GET| "/api/portfolio"| Retrieve all portfolio records
GET| "/api/portfolio/:id"| Retrieve one record
POST| "/api/portfolio"| Create a record
PUT| "/api/portfolio/:id"| Update a record
DELETE| "/api/portfolio/:id"| Delete a record

Author

Boniface Chikomo
Cyber Security Student
Mulungushi University, Zambia

GitHub: https://github.com/Boniface10-real