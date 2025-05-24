
# Project Name

## Description  
Briefly describe what your app does.

---

## Prerequisites

- Node.js (version >= 16.x recommended)  
- npm (comes with Node.js)  
- (Optional) A database (e.g., MongoDB, PostgreSQL) if your app requires it  
- CSV data file placed in `data/` folder (if applicable)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/AshokkumarAnnadurai/lumel.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root folder and add necessary environment variables:

```env
PORT=8000
MONGODB_URI=mongodb+srv://ashokkumar:ashokbtech@cluster0.pasygkv.mongodb.net?retryWrites=true&w=majority

OTHER_ENV_VARS=...
```

---

## Data Setup

- Place your CSV file named `daily_upload.csv` inside the `data/` folder:  
`/data/daily_upload.csv`  
(Ensure this file exists for the cron job or upload features)

---

## Running the Application

### Start the server

```bash
npm start
```

OR (if you use nodemon for development)

```bash

npm start (or) npm run dev
```

The server will start on the port defined in `.env` (default: 8000).

---

## API Endpoints

- `POST /upload` — Upload CSV file (multipart/form-data)
- (Add other endpoints you have)

---

## Cron Job for Data Refresh

- The app automatically runs a daily data refresh at midnight (server time) using `node-cron`.  
- Make sure the CSV file exists at `data/daily_upload.csv` for the refresh to work.  
- Logs are saved to `/logs/data-refresh.log` for monitoring.

---

## Logs

- Application logs can be found in `logs/app.log`  
- Data refresh logs are in `logs/data-refresh.log`

---

## Troubleshooting

- **Error: ENOENT no such file or directory**  
  Ensure the CSV file exists at `/data/daily_upload.csv` before starting the server.

- **Database connection issues**  
  Verify your `MONGODB_URI` is correct in the `.env` file.

---
