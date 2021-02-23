[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Build Website using Google Optimize and Contentstack

About Contentstack: [Contentstack](https://www.contentstack.com/) is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content.

A/B testing refers to the process of displaying two variations of a web page to different segments of your website visitors. These variations are basically personalized content targeted to test which one drives more conversion. By using the results of A/B testing, you can determine the winning variation and then optimize your website for better results.

Google Optimize is a popular open source website optimization tool that helps businesses to run A/B tests on their websites along with integrated analytics for smarter business decisions.


## Sample Web App

 1. Clone the git repository. You can find additional example front ends here: [https://www.contentstack.com/docs/example-apps](https://www.contentstack.com/docs/example-apps)

2. Set up Node.js as described here: ​[https://nodejs.org/en/](https://nodejs.org/en/)

3. Get your API Key and Delivery Token.

4. Open the ​config ​ folder

5. Set up the ​api key, delivery token, tracking Id and	optimize Id ​for default.js in this folder.

6. Save changes made

7. Run the web app (executions in terminal below)

		a. Navigate to the root folder of the demo

		b. npm install

		c. Install and run gulp (for CSS).  Not running this will cause the menu styling to not load.
		```
		npm install --global gulp-cli
		npm i gulp 
		gulp
		```
		c. npm start

8. Open ​http://localhost:4000 ​ in your web browser

## Tutorial

In this guide, we will discuss the steps to implement A/B testing on a sample e-commerce website using Google Optimize. The goal is to determine which variant of the navbar, on the website, is driving conversions - "sticky" navbar or "non-sticky" navbar.

## Documentation

Read Contentstack [docs](https://www.contentstack.com/docs/)

Learn about [Implementing Personalization Using Google Optimize on Your Website](https://www.contentstack.com/docs/developers/how-to-guides/implementing-personalization-using-google-optimize-on-your-website/)