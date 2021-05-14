## A Simple Rule-validation API: 
This challenge examined my back-end skills in creating the backbone structure of an application.

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
My rule-validation API has two routes:
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
- [x] A. The rule and data fields are required.

- [x] B. The rule field should be a valid JSON object and should contain the following required fields:
    - b1 field: The field in the data passed to validate the rule against. My implementation for the field also supports nested data objects. e.g. if field is passed as `"card.first6"` it means I have to check to see if the data contains a card field, then check to see if the card field contains a `first6` field. `*Note:*` The nesting is not more than two levels
    - b2 condition: The condition to use for validating the rule. Accepted condition values are:
        > *i. eq: Means the field value should be equal to the condition value*

        > *ii. neq:* Means the field value should not be equal to the condition value.*
        
        >*iii. gt: Means the field value should be greater than the condition value.* 
        
        >*iv. gte: Means the field value should be greater than or equal to the condition value .*

        >*v. contains:* Means the field value should contain the condition value.*

    - b3 condition_value: The condition value to run the rule against. Your rule evaluation is expected to be like: 
    `["data.field"] ["rule.condition"] ["rule.condition_value"]`

- [x] C. The data field can be any of:
    - c1/ A valid JSON object 
    - c2/ A valid array
    - c3/ A string

- [x] D. If a required field isn't passed, my endpoint returns with a response (HTTP 400 status code) that is similar to the below: 
```jsx
    {
        "message": "[field] is required."
        "status": "error",
        "data": null
    }
```
    E.g. if the rule field is not passed, my endpoint response would be:
```jsx
    {
        "message": "rule is required."
        "status": "error",
        "data": null
    }
```
    
    
- [x] E. If a field is of the wrong type, my endpoint returns with a response (HTTP 400 status code) that is similar to the below:
```jsx
        {
            "message": "[field] should be a|an [type]."
            "status": "error",
            "data": null
        }
```
    E.g. if the rule field is passed as a number instead of a valid object, my endpoint response would be:
```jsx
    {
        "message": "rule should be an object."
        "status": "error",
        "data": null
    }
```


- [x] F. If an invalid JSON payload is passed to my API, the endpoint response (HTTP 400 status code) would be:
```jsx
    {
        "message": "Invalid JSON payload passed."
        "status": "error",
        "data": null
    }       
```

- [x] G. If the field specified in the rule object is missing from the data passed, my endpoint response (HTTP 400 status code) would be:
```jsx
    {
        "message": "field [name of field] is missing from data."
        "status": "error",
        "data": null
    }
```
E.g.
```jsx
    {
        "message": "field age is missing from data."
        "status": "error",
        "data": null
    }
```

- [x] H. If the rule is successfully validated, my endpoint response (HTTP 200 status code) would be:
```jsx
    {
        "message": "field [name of field] successfully validated."
        "status": "success",
        "data": {
            "validation": {
            "error": false,
            "field": "[name of field]",
            "field_value": [value of field],
            "condition": "[rule condition]",
            "condition_value: [condition value]
            }
        }
    }
```
E.g.
```jsx
    {
        "message": "field missions successfully validated."
        "status": "success",
        "data": {
            "validation": {
            "error": false,
            "field": "missions",
            "field_value": 30,
            "condition": "gte",
            "condition_value: 30
            }
        }
    }
```

- [x] I. If the rule validation fails, my endpoint response (HTTP 400 status code) would be:
```jsx
    {
        "message": "field [name of field] failed validation."
        "status": "error",
        "data": {
            "validation": {
            "error": true,
            "field": "[name of field]",
            "field_value": [value of field],
            "condition": "[rule condition]",
            "condition_value: [condition value]
            }
        }
    }
```
E.g.
```jsx
    {
        "message": "field missions failed validation."
        "status": "error",
        "data": {
            "validation": {
            "error": true,
            "field": "missions",
            "field_value": 30,
            "condition": "gte",
            "condition_value: 54
            }
        }
    }
```
- [x] J. My API solution is hosted on [Heroku](https://heroku.com//)
The two routes are accessible via:
- a/ HTTP [GET] https://collins-flutter.herokuapp.com/
- b/ HTTP [POST] https://collins-flutter.herokuapp.com/validate-rule

---

##### Example JSON request payloads:
- Example 1
```jsx 
    {
        "rule": {
            "field": "missions.count"
            "condition": "gte",
            "condition_value": 30
        },
        "data": {
            "name": "James Holden",
            "crew": "Rocinante",
            "age": 34,
            "position": "Captain",
            "missions": {
            count: 45,
            successful: 44,
            failed: 1
            }
        }
    }
```
***Response: (HTTP 200)***
```jsx
    {
        "message": "field missions.count successfully validated."
        "status": "success",
        "data": {
            "validation": {
            "error": false,
            "field": "missions.count",
            "field_value": 45,
            "condition": "gte",
            "condition_value: 30
            }
        }
    }
```

- Example 2
```jsx
    {
        "rule": {
            "field": "0"
            "condition": "eq",
            "condition_value": "a"
        },
        "data": "damien-marley"
    }
```
***Response: (HTTP 400)***
```jsx
    {
        "message": "field 0 failed validation."
        "status": "error",
        "data": {
            "validation": {
            "error": true,
            "field": "0",
            "field_value": "d",
            "condition": "eq",
            "condition_value: "a"
            }
        }
    }
```

- Example 3
```jsx
  {
    "rule": {
        "field": "5"
        "condition": "contains",
        "condition_value": "rocinante"
    },
        "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
    }
```
***Response: (HTTP 400)***
```jsx
    {
        "message": "field 5 is missing from data."
        "status": "error",
        "data": null
    }
```

