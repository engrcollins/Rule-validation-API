const axios = require('axios');
const express = require('express');
const router = express.Router();

//HTTP GET - Base route "/"
router.get('/', async (req, res) => {
    myProfile = {
        "message": "My Rule-Validation API",
        "status": "success",
        "data": {
          "name": "Collins Tobi AKINBAMI",
          "github": "@engrcollins",
          "email": "akinbamicollins@gmail.com",
          "mobile": "08060887527",
          "twitter": "@engrcollins14"
        }
      }
    return res.status(200).send(myProfile);
})

//HTTP Post "/validate-rule"
router.post('/validate-rule', async (req, res) => {
    let rule = req.body.rule;
    let data = req.body.data;
    
    //Defining response template
    let endPointRes = ({
        "message": "default message",
        "status": "error",
        "data": null
    })
    let fieldArray = []
    let validation = {
        "error": true,
        "condition": rule.condition,
        "condition_value": rule.condition_value
    }

    //Checking endpoint requirements
    if ((typeof rule === "undefined") || (typeof data === "undefined")){
        endPointRes.message = "Invalid JSON payload passed.";
          return res.status(400).json(endPointRes);
    /*}else if ((rule === null) || (typeof data === "null")){
        console.log("rule and data cannot be null")*/

    }else if (typeof rule !== "object"){
        endPointRes.message = "rule should be an object.";
        return res.status(400).json(endPointRes);

    }else if (typeof rule.field === "undefined"){
        endPointRes.message =  "rule field is required.";
        return res.status(400).json(endPointRes);   
    }else {
        if (typeof data === "object"){
            fieldArray = rule.field.split(".")
            if (fieldArray.length === 2){
                validation.field = `${fieldArray[0]}.${fieldArray[1]}`
                validation.field_value = data[fieldArray[0]][fieldArray[1]]
            }else if (fieldArray.length === 1) {
                validation.field = fieldArray[0]
                validation.field_value = data[fieldArray[0]]
            }
        }else{
            validation.field = rule.field
            validation.field_value = data[rule.field]
        }
        console.log(validation.field, validation.field_value)
        if (typeof validation.field_value === "undefined"){
                endPointRes.message = `Field ${validation.field} is missing from data.`;
                return res.status(400).json(endPointRes);
        }
        endPointRes.data = {"validation":validation};

        //Implementing actual rule validation using specified conditions
        switch(rule.condition){
            case "eq":
               if (validation.field_value == rule.condition_value){
                    endPointRes.message = `field ${validation.field} successfully validated.`;
                    endPointRes.status = "success";
                    validation.error = false;
                    return res.status(200).json(endPointRes);
               }else {
                    endPointRes.message = `field ${validation.field} failed validation.`;
                    endPointRes.status = "error";
                    return res.status(400).json(endPointRes);
               }

            case "neq":
                if (validation.field_value !== rule.condition_value){
                    endPointRes.message = `field ${validation.field} successfully validated.`;
                    endPointRes.status = "success";
                    validation.error = false;
                    return res.status(200).json(endPointRes);
                }else {
                    endPointRes.message = `field ${validation.field} failed validation.`;
                    endPointRes.status = "error";
                    return res.status(400).json(endPointRes);
                }

            case "gt":
                if (validation.field_value > rule.condition_value){
                    endPointRes.message = `field ${validation.field} successfully validated.`;
                    endPointRes.status = "success";
                    validation.error = false;
                    return res.status(200).json(endPointRes);
                }else {
                    endPointRes.message = `field ${validation.field} failed validation.`;
                    endPointRes.status = "error";
                    return res.status(400).json(endPointRes);
                }

            case "gte":
                if (validation.field_value >= rule.condition_value){
                    endPointRes.message = `field ${validation.field} successfully validated.`;
                    endPointRes.status = "success";
                    validation.error = false;
                    return res.status(200).json(endPointRes);
                }else {
                    endPointRes.message = `field ${validation.field} failed validation.`;
                    endPointRes.status = "error";
                    return res.status(400).json(endPointRes);
                }
               
            case "contains":
                let x = validation.field_value.toString();
                let y = rule.condition_value.toString();
                if ( x.includes(y)){
                    endPointRes.message = `field ${validation.field} successfully validated.`;
                    endPointRes.status = "success";
                    validation.error = false;
                    return res.status(200).json(endPointRes)
                }else {
                    endPointRes.message = `field ${validation.field} failed validation.`;
                    endPointRes.status = "error";
                    return res.status(400).json(endPointRes);
                }
                    
            default:
                endPointRes.message = `field ${validation.field} failed validation."`;
                endPointRes.status = "error";
                return res.status(400).json(endPointRes);
        }
    }
})

module.exports = router;