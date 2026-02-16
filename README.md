# Dyno League Website

This project is a static site for **The Dyno League of the People** with:
- Team branding and league members
- Trophy room of past winners
- Suggestion box with rotating roast response + "Just kidding, suggestion noted."
- Google Sheets persistence via Google Apps Script

## Files
- `index.html` - Main page
- `styles.css` - UI styling
- `app.js` - Suggestion logic and random responses
- `google-apps-script/Code.gs` - Apps Script backend for Google Sheets

## Setup Google Sheets + Apps Script
1. Create a new Google Sheet named `Dyno League Suggestions`.
2. In that sheet: `Extensions` -> `Apps Script`.
3. Replace the default script with contents of `google-apps-script/Code.gs`.
4. Save.
5. Click `Deploy` -> `New deployment`.
6. Type: `Web app`.
7. Execute as: `Me`.
8. Who has access: `Anyone`.
9. Deploy and copy the Web App URL.
10. Open `app.js` and set:
   `const APPS_SCRIPT_WEB_APP_URL = "<your web app url>";`

## GitHub Pages Deploy
1. Create a new GitHub repo and upload the contents of `dyno-league`.
2. In GitHub repo settings, open `Pages`.
3. Source: `Deploy from a branch`.
4. Branch: `main`, folder: `/ (root)`.
5. Save and wait for the GitHub Pages URL.

## Security note
The Google API key you shared is not required for this approach and is not used in this project.
For safety, rotate that key in Google Cloud Console if it has been exposed.
