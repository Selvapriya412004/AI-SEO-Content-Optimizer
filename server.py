from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from playwright.sync_api import sync_playwright

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow frontend to access backend

# Configure Google Gemini API (Replace with your actual API key)
genai.configure(api_key="api key need to give")

def fetch_page_content(url):
    """Scrapes webpage content using Playwright."""
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, timeout=60000, wait_until="domcontentloaded")
            html = page.content()
            browser.close()

        # Extract SEO Title and Meta Description
        title_start = html.find("<title>") + 7
        title_end = html.find("</title>")
        title = html[title_start:title_end] if title_start != -1 and title_end != -1 else "No Title Found"

        meta_start = html.find('name="description" content="') + 28
        meta_end = html.find('"', meta_start)
        meta_desc = html[meta_start:meta_end] if meta_start != -1 and meta_end != -1 else "No Meta Description Found"

        content_text = html.replace("<", " <").split()[:500]  # Extract words (limit 500)
        content_text = " ".join(content_text)

        return {"title": title, "meta_description": meta_desc, "content": content_text}

    except Exception as e:
        print("❌ Error fetching page:", e)
        return None

def get_ai_suggestions(title, meta_desc, content):
    """Uses Google Gemini AI to generate SEO-optimized content."""
    try:
        if not title or not meta_desc or not content:
            return "❌ No valid input provided for AI."

        prompt = f"""
        Given the following webpage content:
        - Title: {title}
        - Meta Description: {meta_desc}
        - Content: {content}

        Suggest SEO-optimized improvements including:
        - A better title optimized for search engines
        - An improved meta description (max 160 characters)
        - Suggestions for better keyword placement
        - Any missing entities that should be included.
        """

        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)

        return response.text.strip()

    except Exception as e:
        print("❌ Error with AI generation:", e)
        return "AI optimization failed."

@app.route('/')
def home():
    return 'Welcome to the homepage!'

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    print(f"🔍 Analyzing: {url}")

    try:
        seo_data = fetch_page_content(url)
        if not seo_data or not seo_data["title"]:
            return jsonify({"error": "Failed to fetch valid content from the URL"}), 500

        ai_suggestions = get_ai_suggestions(seo_data["title"], seo_data["meta_description"], seo_data["content"])
        return jsonify({"original": seo_data, "optimized": ai_suggestions})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
