# KBC+ Frontend Deployment

This folder contains the static frontend files ready for deployment to Surge.sh

## Files included:
- index.html (main page)
- login.html
- admin.html
- debug.html
- assets/ (CSS, JS, images)

## Important Notes:
⚠️ **Backend functionality is NOT included**
- The PHP backend files won't work on Surge
- API calls to `backend/api/*.php` will fail
- Features like radio streaming, TV channels, podcasts, and news won't load data

## To deploy:

1. **Install Node.js** (if not already installed):
   - Go to https://nodejs.org/
   - Download and install the LTS version

2. **Install Surge**:
   ```
   npm install -g surge
   ```

3. **Deploy**:
   ```
   surge
   ```
   - Follow the prompts
   - Choose a domain name (e.g., my-kbc-app.surge.sh)

## For full functionality:
Consider deploying the PHP backend to a service like:
- Heroku
- Railway
- PlanetScale (for database)
- Any shared hosting provider that supports PHP

Then update the API URLs in `assets/js/main.js` to point to your backend server.
