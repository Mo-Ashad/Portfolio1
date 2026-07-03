# Ashad Ansari — DevOps Portfolio (Flask)

This is a full-stack personal portfolio for Ashad Ansari. The frontend is static HTML/CSS/JS and the backend is a small Flask app used to serve the site and accept contact form submissions.

Quick start (Windows / VS Code):

1. Create a virtual environment and install dependencies

```powershell
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the app

```powershell
python app.py
```

3. Open http://127.0.0.1:5000 in your browser.

Files of interest:

- app.py — Flask backend. Routes: `/`, `/contact` (POST), `/health`, `/messages` (demo).
- `templates/index.html` — Frontend HTML served by Flask.
- `static/style.css`, `static/script.js` — Frontend assets.
- `contact_messages.json` — Stores received messages (created on first contact submission).

Notes:

- The contact form posts JSON to `/contact` and the backend saves messages to `contact_messages.json`.
- For production, consider using a proper database (SQLite/Postgres) and protecting the `/messages` endpoint.

Updated portfolio with certificates, DevOps skills, and cloud computing internship details.
