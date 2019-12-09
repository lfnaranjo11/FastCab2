# FastCab2


https://taxis-whatsapp.herokuapp.com/

 ![image](https://drive.google.com/uc?export=view&id=1vSycqCyF1IhzKpOj8B9JFC3h7R_7sKI2)
 
 
# FastCab
A webpage to make transportation easier than ever.



**project objectives**

* Create a fast way to ask for a cab or a vehicule. Using whatsapp or another known platform. Avoid the app acumulation

* Allow drivers to get a client avoiding conflicts with other drivers i.e getting the same travel for two of them.

* Allow the user to get a safe cab, i.e verify the identity of the driver

**how to use the aplication as a client**

 ![image](https://drive.google.com/uc?export=view&id=1FcnhotQu_t2KQTPJE3uXTBTkqL0rymq1)

1)scan the previous QR code or write to +1415523886 join cap-previous

 ![image](https://drive.google.com/uc?export=view&id=1KfowfZiPBVBJQLwbdv6mn1GhI4DAkF7N)
 
 2) Type anything to get help. or directly write Recogerme en [address you want to be pickup]
 
 
 3)Confirm your address and then wait for someone to pick you up 

Open the 

**Used  technologies**
* html
* css
* meteor
* twilio API
* google Maps API


**how to deploy localy**

Since the twilio API requires you to expose your server. Locally you can only deploy the front unless, you expose your ip to the internet. 
.For information on how to do that refer to https://medium.com/botfuel/how-to-expose-a-local-development-server-to-the-internet-c31532d741cc


1) clone the repo
```
git clone https://github.com/lfnaranjo11/FastCab2.git
```

2) step into de directory
```
cd FastCab2/front
```
3) install on the front

```
npm install 
```

5) run the file

```
npm start
```

6) open in the browser the front 

```
localhost:3000
```

in this way you can change the front and it will go against the remote server deployed at

**how to deploy remote**

1)Download the repo

```
git clone https://github.com/lfnaranjo11/FastCab2.git

```

2) create a new heroku project. More info at: https://dashboard.heroku.com/apps/fast-cab-2/deploy/heroku-git


```
push to your heroku project
```

3)create  new environment variables
More info at: https://www.twilio.com/ and https://www.mongodb.com/cloud/atlas

```
heroku config:set PORT=3001
heroku config:set SECRET=WHATEVER_YOU_WANNA_USE_TO_ENCRYPT
heroku config:set TWILIO_AUTH_TOKEN=WHATEVER_TWILIO_GIVES_YOU_AS_TOKEN
heroku config:set TWILIO_SID=WHATEVER_IS_YOUR:TWILIO_SID
heroku config:set MONGODB_URI= WHATEVER_IS_THE_URI_OF_YOUR_MONGO_REPOSITORY

```


**Useful links**

**Auxilary repostories**

This project works better and will redirect to pages deployed in the next repositories

 https://github.com/mateodevia/wheresMyTaxi
 https://github.com/mateodevia/AdressLocationMap


**remote server**
https://taxis-whatsapp.herokuapp.com/
**presentation of the project**


**Autores** 

 Leonel Francisco Naranjo Forero
 * [__Leonel Francisco Naranjo Forero__](https://github.com/lfnaranjo11)


  Mateo Devia Vega
  * [__Mateo Devia__](https://github.com/mateodevia)

  

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository has the standard MIT license. You can find it [here.](https://github.com/lfnaranjo11/FastCab2/blob/master/LICENSE)

