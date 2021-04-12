## Simple Role Based Authorization with Casbin 
Implementation RBAC that controls a user's access to a resource based on the name and HTTP method

## using 
```shell 
POST http://localhost:8000/camicroscope/resource1?user=ryan
```
Ryan's polciy "p, ryan, /camicroscope/*, GET" only allows him make a GET request to resources under camicroscope. Making a POST request to any other these resource would return a 400. 

On the other hand, an admin can make a GET or POST to any of the resources.

## Requirements
This project uses ESM, so you should use a node version that supports ESM ideally v12 or transpile using babel. If turn using v8-10 turn on the experimental ESM feaure.

## Casbin Abstractons  
The most important of abstraction in Casbin is the PERM metamodel (Policy, Effect, Request, Matchers). PERM metamodel is used to define a Casbin model.
A Casbin model(model.conf) is a config file that holds the definitions for the elements of the metamodel.

[request_definition] - defines the shape of the access control request sent when checking for access
[policy_definition] defines the structure of the policy.
[policy_effect] defines a sort of folding function that, given a set of policies that apply to the request, decides whether the operation is allowed or not.
[matchers] defines a condition that, provided a policy and the request, defines whether the policy allows the operation for that Request

The policy.csv file contains the relevant policies.