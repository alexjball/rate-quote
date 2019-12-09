[![Build Status](https://travis-ci.com/alexjball/json-dom.svg?branch=master)](https://travis-ci.com/alexjball/json-dom)

# rate-quote

Install Node v12, then run `npm install`.

The client accepts its API key using an environment variable. To specify it, create a file called `.env.local` and with the contents:

```
REACT_APP_API_KEY="Your API key"
```

Run `npm start` to run the web page. The dev server will load the variables from `.env.local` and the client will be able to access the API.