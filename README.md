## How to run - 4 easy steps

1. clone the main branch locally

In the project root directory,

2. install dependences by running `yarn`

3. run the following in terminal to get around CORS issues - this will open a new chrome window ready for http://localhost:3000
   (This is get around CORS issues otherwise the api data will not be returned)

`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

4. run `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

---

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).
