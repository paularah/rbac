import express from "express"
import {newEnforcer} from "casbin"
import routes from "./routes.js"

/**
 * @description checks for the user's role based of the model and policy
 * @param {*} obj - the oject here is the user 
 * @param {*} sub  - the subject here is the path to the resource
 * @param {*} act  - action here is the HTTP method
 * @returns Promise<boolean>
 */

const checkPermission = async (obj, sub, act) => {
    const enforcer = await newEnforcer('model.conf', 'policy.csv');
    const allowed = await enforcer.enforce(obj, sub, act)
    return allowed;
}

const RBACmiddleware = async (req, res, next) => {
    try{
        const user = req.query.user
        const {path, method} = req;
        const valid  =  await checkPermission(user, path, method)
        if(!valid) throw new Error("You are not authorised to access this resource!")
        console.log("we're in buddies!")
        next();
    }catch(e){
        res.status(400).json({
            success:"false",
            error:e.message
        })
    }

}


const app = express()
app.use(RBACmiddleware);
app.use("/camicroscope", routes)
  app.listen(8000, () => {
      console.log("RBAC API running on port 8000")
  })