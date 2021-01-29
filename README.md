## ENYE Phase 1.2: Back-end
This challenge examined my back-end skills in creating the backbone structure of an application

### Currency Rates API

I was tasked with creating a service integration to a public API and exposing a RESTful endpoint. The endpoint will accept requests and returns a modified response schema from the integrated API.

My application integrate with the [Exchange Rate API](https://api.exchangeratesapi.io/latest) to proxy requests 

- My REST endpoint `/api/rates` returns a JSON object of the latest currency rates in the following format/schema:

```jsx
{
    "results": {
        "base": "",
        "date": "",
        "rates": {
        }
    }
}
```

### Required Technology

- [ExpressJS](https://expressjs.com/)

### Tasks Completed

1. I created an endpoint that accepts a `GET` request to `/api/rates`
2. The `/api/rates` endpoint accepts the following request query parameter strings
    1. **base**: the home currency rates quoted against (e.g. `CZK`)
    2. **currency**: the specific exchange rates based on a comma-separated symbols parameter (e.g. `EUR,GBP,USD`).
3. I assumed standard HTTP status codes on the response. If a request is unsuccessful, my application properly handles it accordingly with the appropriate status codes
4. Upon a successful API response, the fetched payload tansforms into an object containing the following keys:
    1. **results**: JSON object containing the results from the API
    2. **base**: the requested home rate from the request URL query strings
    3. **date**: the current date 
    4. **rates**: An Object containing the requested currency in the request URL query strings
5. My application server is written with Node using an Express server ([https://expressjs.com/](https://expressjs.com/))
6. My backend code was deployed on - [Heroku](https://heroku.com/)

---

A sample `GET` request to fetch the currency exchange rates from `USD` to `CNY,JPY,CAD` looks like:

```jsx
    enye-collins-api.herokuapp.com/api/rates?base=usd&currency=cny,jpy,cad
```

A successful response for the above request should return the following schema (of course with a more up-to-date values)

```jsx
{
    "results": {
        "base": "USD",
        "date": "2021-01-14",
        "rates": {
            "CNY": 6.4672550313,
            "JPY": 104.0993071594,
            "CAD": 1.2686407126
        }
    }
}
```