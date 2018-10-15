# MapReminder
Application with aws services.
Trace your movement and notify you when you enter some places

# routes /sign-up - sign up a new account

# client socket events

## authenticate - authenticate to server

## chase - check if something near
latitude: Joi.number().min(-86).max(86).required(),  
longitude: Joi.number().min(-180).max(180).required()  

## put - add new place :
name: Joi.string().min(3).max(30).required(),  
description: Joi.string().min(3).max(100),  
latitude: Joi.number().required().min(-86).max(86),  
longitude: Joi.number().min(-180).max(180).required(),  
tolerance: Joi.number().min(0.0002).max(0.5).required()  

## del - delete a place (id):
id: Joi.required()

## delHis - delete history
id: Joi.required()

## list - list a user's places

# server events 

## authenticated - authentication done
else reject ( sorry :< )

## err
event (name)  
...error stack  

## near - some place near found
name: Joi.string(),  
description: Joi.string(),  
latitude: Joi.number(),  
longitude: Joi.number(),  
tolerance: Joi.number(),  
userEmail: Joi.string(),  
active: Joi.boolean()  

## del-done - id deleted

## delHis-done - delete history

## snooze-done - snooze set

## put-done - loc put

## unsnooze-done - unsnooze triggered

## list-done - list sent
[locations array]