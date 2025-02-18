# AI SEO Content Analyzer

AI-powered SEO Content Analyzer that scrapes webpage content, analyzes its SEO performance, and suggests optimized improvements using Google Gemini AI.

## 🚀 Features
- Scrapes webpage content using **Playwright**
- Extracts **SEO Title**, **Meta Description**, and **Content**
- Uses **Google Gemini AI** to suggest optimized content
- Built with **Flask** (Backend) & **React** (Frontend)

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Flask, Flask-CORS
- **Web Scraping:** Playwright
- **AI Processing:** Google Gemini AI API

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/ai-seo-analyzer.git
cd ai-seo-analyzer
```

### 2️⃣ Backend Setup (Flask)
```sh
cd backend  # Navigate to backend folder
pip install -r requirements.txt  # Install dependencies
python -m playwright install  # Install Playwright browser dependencies
python server.py  # Start Flask server
```

### 3️⃣ Frontend Setup (React)
```sh
cd frontend  # Navigate to frontend folder
npm install  # Install dependencies
npm start  # Start React development server
```

---

## 🔥 Usage
1. Open `http://localhost:3000/`
2. Enter a website URL
3. Click `Analyze`
4. View **original content** and **AI-optimized suggestions**

---

## 📌 API Endpoints
| Method | Endpoint  | Description  |
|--------|-----------|--------------|
| `POST` | `/analyze` | Analyze webpage content & return SEO suggestions |

### Request Example:
```json
{
  "url": "https://www.example.com"
}
```

### Response Example:
```json
{
  "original": {
    "title": "Example Title",
    "meta_description": "An example meta description.",
    "content": "Sample website content..."
  },
  "optimized": "Optimized title and description suggestions..."
}
```

---

## 🛠 Troubleshooting
**1. Flask Server Not Running?**
- Ensure Python dependencies are installed: `pip install -r requirements.txt`
- Run `python server.py`

**2. React App Not Running?**
- Check if `npm install` was successful
- Run `npm start` and ensure it’s listening on `http://localhost:3000/`

**3. CORS Issues?**
- Ensure Flask backend has `CORS(app)` enabled

---

## 🤖 Future Improvements
- Add support for multiple AI models (e.g., OpenAI GPT-4)
- Improve UI/UX with better loading indicators
- Implement database storage for past analyses

---

## 💡 Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to branch (`git push origin feature-branch`)
5. Submit a Pull Request 🚀

---

## 📜 License
MIT License © 2025 AI SEO Content Analyzer

