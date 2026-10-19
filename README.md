# Boniface Chikomo — Full-Stack Portfolio (ICT251 Activity 4)

This project implements Question 11, Portfolio Landing Page, using a single SQLite table and a Node.js/Express REST API.

## Requirements
- Node.js installed
- VS Code (recommended)
- Postman for endpoint testing

## 1. Start the backend
Open a terminal in VS Code and run:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm start
```

If using Command Prompt rather than PowerShell, use `copy .env.example .env` instead of `Copy-Item`.

The API runs at `http://localhost:3000`. The SQLite database `portfolio.db` is created automatically, the table is created from `schema.sql`, and ten sample records are inserted on first run.

## 2. Open the frontend
Open `frontend/index.html` in your browser. For a better local development experience, use the VS Code Live Server extension. Keep the backend terminal running. The frontend talks to `http://localhost:3000/api/portfolio`.

## 3. API endpoints for Postman
Use `http://localhost:3000` as the base URL. All responses are JSON.

| Method | URL | Purpose |
|---|---|---|
| GET | `/api/portfolio` | List all records |
| GET | `/api/portfolio/1` | Get one record |
| POST | `/api/portfolio` | Create a record |
| PUT | `/api/portfolio/1` | Update record 1 |
| DELETE | `/api/portfolio/1` | Delete record 1 |

### POST request body (Body → raw → JSON)
```json
{
  "owner_name": "Boniface Chikomo",
  "headline": "Cyber Security Student",
  "bio": "I am a Cyber Security student at Mulungushi University interested in ethical hacking and digital safety.",
  "email": "your-email@example.com",
  "location": "Zambia",
  "skills": "Python, Networking, Cybersecurity fundamentals",
  "projects": "Personal Portfolio Website, Python Practice",
  "linkedin_url": "",
  "github_url": ""
}
```

For PUT, use the same JSON body at `/api/portfolio/1` and change one field to show it updated. Test DELETE last, because it removes the record. Use GET after POST/PUT/DELETE to verify the changes. Capture screenshots or a screen recording of the method, URL, request body where applicable, and JSON response as your assignment asks.

## Database fields
`id` (auto-increment primary key), `owner_name`, `headline`, `bio`, `email`, `location`, `skills`, `projects`, `linkedin_url`, `github_url`, `created_at`, `updated_at`.

## Important before submission
- Replace `your-email@example.com` with your real email if you want it displayed.
- The ten seed rows are demonstration data. Keep the records relevant to the assignment and use your own authentic portfolio information.
- The assignment mentions cloud deployment. This project is configured for local testing first. SQLite file persistence and deployment requirements depend on the hosting provider; do not claim the app is deployed until you have deployed and tested it and can share the real URL.
