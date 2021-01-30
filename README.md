## A Simple Rule-validation API: Back-end
This challenge examined my back-end skills in creating the backbone structure of an application

### Currency Rates API

I was tasked with creating a simple rule-validation API. The response structure for my API is fashioned after the popular JSEND pattern. 

Example:
```jsx
{
  "message": "API response message",
  "status": "success",
  "data": {
    isValidForRule: true,
  }
}
```
My rule-validation API have two routes:
1. First route is the base route. HTTP GET "/". It returns with data in the following format:
```jsx
{
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
        "name": "Collins John DOE",
        "github": "@engrcollins",
        "email": "collinsjohndoe@gmail.com",
        "mobile": "080123456789",
        "twitter": "@engrcollins14"
    }
}
```
2. Second route is the rule validation route. HTTP POST "/validate-rule"
The route accepts JSON data containing a rule and data field to validate the rule against. Example:
```jsx
{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}
```
### Endpoint requirements/constraints:
***a*** The rule and data fields are required.

***b*** The rule field should be a valid JSON object and should contain the following required fields: 
**b1 field:** The field in the data passed to validate the rule against. My implementation for the field also supports nested data objects. e.g. if field is passed as "card.first6" it means I have to check to see if the data contains a card field, then check to see if the card field contains a first6 field. *Note:* The nesting is not more than two levels]
b2/ condition: The condition to use for validating the rule. Accepted condition values are:
    i/ eq: Means the field value should be equal to the condition value 
    ii/ neq: Means the field value should not be equal to the condition value 
    iii/ gt: Means the field value should be greater than the condition value 
    iv/ gte: Means the field value should be greater than or equal to the condition value 
    v/ contains: Means the field value should contain the condition value
b3/ condition_value: The condition value to run the rule against. Your rule evaluation is expected to be like: 
["data.field"] ["rule.condition"] ["rule.condition_value"]

c/ The data field can be any of:
c1/ A valid JSON object 
c2/ A valid array
c3/ A string

- [ExpressJS](https://expressjs.com/)


    2. **currency**: the specific exchange rates based on a 
6. My backend code was deployed on - [Heroku](https://heroku.com/)

---

A sample `GET` request to fetch the currency exchange rates from `USD` to `CNY,JPY,CAD` looks like:

