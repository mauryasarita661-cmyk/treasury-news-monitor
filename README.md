# Treasury News Monitor

## Run locally
1. Install Node.js 18+.
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm start`
5. Open http://localhost:3000

The browser checks the server every 30 seconds, so the page does not need manual refresh.
Click **Enable notifications** to allow browser notifications.

Note: the backend tries the Treasury RSS endpoint first. If Treasury changes/disables that endpoint, the app keeps the last successful data and can be updated to another official feed/API.
