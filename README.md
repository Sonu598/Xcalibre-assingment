# AI-Powered Hospital Healthcare System

## 📌 Overview
This project is an **AI-powered Hospital Healthcare System** that allows users to query hospital data using **natural language**. The AI converts the input into **SQL queries**, which are executed on a relational database to retrieve relevant patient and provider data.

## 🚀 Features
- **Natural Language to SQL Conversion** using AI (Gemini AI integration)
- **Database Management**: Handles patients, doctors (providers), appointments, and vitals (BP, temperature, etc.)
- **REST API (Node.js & Express)** for querying data
- **Simple & Beautiful One-Page Frontend** using HTML, CSS, and Vanilla JS
- **Deployment on Free-Tier Services** (Backend: Render, Frontend: Vercel/Netlify)

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MySQL
- **AI Integration:** Gemini AI (for text-to-SQL conversion)

## 📂 Project Structure
```
/ai-hospital-healthcare-system
│── backend/                  # Node.js + Express backend
│   ├── index.js              # Main server file
│   ├── routes                # API route for querying SQL
|         ├── routes.js
│   ├── config                # MySQL database connection
|         ├── db.js
│   ├── middleware            # AI-powered text-to-SQL conversion
|         ├── geminAi.js
|         ├── ratelimit.js
│── frontend/                 # HTML, CSS, JS frontend
│   ├── index.html            # Main frontend file
│   ├── styles.css            # Stylesheet
│   ├── script.js             # JavaScript functionality
│── README.md                 # Project documentation
```

## 📌 Setup Instructions
### 1️⃣ Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Sonu598/Xcalibre-assingment.git
   cd Xcalibre-assingment/Server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up **MySQL Database** and configure the connection in `db.js`.
4. Start the backend server:
   ```sh
   npm run server
   ```

### 2️⃣ Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../Client
   ```
2. Open `index.html` in a browser.

## 🚀 API Usage
### **POST /query**
- **Description:** Converts natural language queries into SQL and executes them.
- **Request Body:**
  ```json
  {
    "naturalQuery": "Show BP readings for John Doe"
  }
  ```
- **Response Example:**
  ```json
  {
    "Output": "{ "bp_systolic": 123, "bp_diastolic": 81 }"
  }
  ```

## 🎯 Example Queries
- "Show temperature of patient Jane Doe."
- "List all patients and their BP."

## 📌 Deployment
- **Frontend:** Deploy to Netlify
- **Backend:** Deploy to Render

## 🤝 Contributing
Feel free to submit **issues or pull requests** to enhance the project.

---
Enjoy building your AI-powered Hospital Healthcare System! 🚀

