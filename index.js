import express from "express"
import {newEnforcer} from "casbin"
import routes from "./routes.js"

/**
 * @description checks for the user's role based of the model and policy
 * @param {*} obj - oject here is the user 
 * @param {*} sub 
 * @param {*} act 
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
        console.log(user, path, method)
        const valid  =  await checkPermission(user, path, method)
        console.log(valid)
        if(!valid) throw new Error("You are not authorised to access this resource!")
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