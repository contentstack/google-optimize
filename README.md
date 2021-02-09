# Build Website using Google Optimize and Contentstack

About Contentstack: [Contentstack](https://www.contentstack.com/) is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content.


## Sample Web App

 1. Clone the git repository. You can find additional example front ends here: [https://www.contentstack.com/docs/example-apps](https://www.contentstack.com/docs/example-apps)

2. Set up Node.js as described here: ​[https://nodejs.org/en/](https://nodejs.org/en/)

3. Get your API Key and Delivery Token.

4. Run the web app (executions in terminal below)

a. Navigate to the root folder of the demo

b. npm install

c. Install and run gulp (for CSS). Not running this will cause the menu styling to not load.
```
npm install --global gulp-cli
npm i gulp 
gulp
```
c. API_KEY="api_key" DELIVERY_TOKEN="delivery_token" ENVIRONMENT="contentstack_env" REGION="contentstack_region" TRACKING_ID="google_tracking_id" OPTIMIZE_ID="google_optimize_id" npm run dev

8. Open ​http://localhost:4000 ​ in your web browser
