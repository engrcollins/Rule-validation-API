const axios = require('axios');
const express = require('express');
const router = express.Router();

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

router.post('/validate-rule', async (req, res) => {
    let rule = req.body.rule;
    let data = req.body.data;
    let endPointRes = ({
        "message": "default message",
        "status": "error",
        "data": null
    })
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
        let fieldArray = rule.field.split(".");
        if (fieldArray.length < 2){
            endPointRes.message = "rule field chain is required.";
            return res.status(400).json(endPointRes);
        }else {
            if (typeof data[fieldArray[0]] === "undefined"){
                endPointRes.message = `Field ${fieldArray[0]} is missing.`;
                return res.status(400).json(endPointRes);
            }else if (typeof data[fieldArray[0]][fieldArray[1]] === "undefined"){
                endPointRes.message = `Field ${fieldArray[0]}.${fieldArray[1]} is missing.`;
                return res.status(400).json(endPointRes);
            }
        }
        let validation = {
            "error": false,
            "field": fieldArray[0],
            "field_value": data[fieldArray[0]][fieldArray[1]],
            "condition": rule.condition,
            "condition_value": rule.condition_value
        }
        switch(rule.condition){
            case "eq":
               if (data[fieldArray[0]][fieldArray[1]] == rule.condition_value){
                    endPointRes.message = "field missions successfully validated.";
                    endPointRes.status = "success";
                    endPointRes.data = validation;
                    return res.status(200).json(endPointRes);
               }else {
                    endPointRes.message = "field missions failed validated.";
                    endPointRes.status = "error";
                    validation.error = true;
                    endPointRes.data = validation;
                    return res.status(400).json(endPointRes);
               }

            case "neq":
                if (data[fieldArray[0]][fieldArray[1]] !== rule.condition_value){
                    endPointRes.message = "field missions successfully validated.";
                    endPointRes.status = "success";
                    endPointRes.data = validation;
                    return res.status(200).json(endPointRes);
                }else {
                    endPointRes.message = "field missions failed validated.";
                    endPointRes.status = "error";
                    validation.error = true;
                    endPointRes.data = validation;
                    return res.status(400).json(endPointRes);
                }

            case "gt":
                if (data[fieldArray[0]][fieldArray[1]] > rule.condition_value){
                    endPointRes.message = "field missions successfully validated."
                    endPointRes.status = "success"
                    endPointRes.data = validation
                    return res.status(200).json(endPointRes)
                }else {
                    endPointRes.message = "field missions failed validated.";
                    endPointRes.status = "error";
                    validation.error = true;
                    endPointRes.data = validation;
                    return res.status(400).json(endPointRes);
                }

            case "gte":
                if (data[fieldArray[0]][fieldArray[1]] >= rule.condition_value){
                    endPointRes.message = "field missions successfully validated."
                    endPointRes.status = "success"
                    endPointRes.data = validation
                    return res.status(200).json(endPointRes)
                }else {
                    endPointRes.message = "field missions failed validated.";
                    endPointRes.status = "error";
                    validation.error = true;
                    endPointRes.data = validation;
                    return res.status(400).json(endPointRes);
                }
               
            case "contains":
                let x = data[fieldArray[0]][fieldArray[1]].toString()
                let y = rule.condition_value.toString()
                if ( x.includes(y)){
                    endPointRes.message = "field missions successfully validated."
                    endPointRes.status = "success"
                    endPointRes.data = validation
                    return res.status(200).json(endPointRes)
                }else {
                    endPointRes.message = "field missions failed validated.";
                    endPointRes.status = "error";
                    validation.error = true;
                    endPointRes.data = validation;
                    return res.status(400).json(endPointRes);
                }
                    
            default:
                endPointRes.message = "field missions failed validated.";
                endPointRes.status = "error";
                validation.error = true;
                endPointRes.data = validation;
                return res.status(400).json(endPointRes);
        }
    }
})

module.exports = router;