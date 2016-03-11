# nassDB
Database/API for Nass Replication website.

## Structure

The API is built around a MongoDB that is based on AWS.  The API is automatically deployed to Heroku via Travis-ci.  There are a few tests that are run against the db nass and collection test.  The API itself targets the db nass and the collection surveys.  

There's one limitation at this point:  Heroku imposes a sleep on websites that have inactivity for a period of time.  So the best thing to do is sort of prime the API to make sure it's awake at this [link](http://nassdb.herokuapp.com).  Once we are actually running the app with real users we can switch the plan of the API so as to have it be active all of the time.

## Routes

#### GET

There are two get routes, one for getting a survey by name, and one for getting all of the surveys.

- Get all of the surveys:

http://nassdb.herokuapp.com/api/v1/surveys/

Example curl request:

```
curl -X GET -u username:pw "http://nassdb.herokuapp.com/api/v1/surveys"
```

- Get one survey by name, where chutulu is whatever name you want:

http://nassdb.herokuapp.com/api/v1/surveys/name/chutulu

Example curl request:

```
curl -X GET -u username:pw "http://nassdb.herokuapp.com/api/v1/surveys/name/chutulu"
```


#### POST

One route:

http://nassdb.herokuapp.com/api/v1/surveys/

Where the body of the request should be:

```
{
  "name":"chutulu",
  "ownMachine": 1,
  "cs" : 0,
  "gender": "f",
  "progExp": 0,
  "age": 100, 
  "q1":5, 
  "q2":8, 
  "q3":4, 
  "q4":9, 
  "q5":1
}
```

Example curl request:
```
curl -X POST -u username:pw -d '{
  "name":"chutulu",
  "ownMachine": 1,
  "cs" : 0,
  "gender": "f",
  "progExp": 0,
  "age": 100, 
  "q1":5, 
  "q2":8, 
  "q3":4, 
  "q4":9, 
  "q5":1
}' "http://nassdb.herokuapp.com/api/v1/surveys/"
```

#### PUT
One route to update a survey by name, where the name is "chutulu":

http://nassdb.herokuapp.com/api/v1/surveys/name/chutulu

Where the body should be the following if we want to update just the questions:

```
{
"q1":9, 
"q2":7, 
"q3":4,
"q4":9, 
"q5":1
}
```

Example curl request:

```
curl -X PUT -u username:pw -d '{"q1":9, "q2":7, "q3":4,"q4":9, "q5":1}' "http://nassdb.herokuapp.com/api/v1/surveys/name/chutulu"
```

#### DELETE
One route to delete a survey by name, where the name is "chutulu":

http://nassdb.herokuapp.com/api/v1/surveys/name/chutulu

Example curl request:

```
curl -X DELETE -u username:pw -d '' "http://nassdb.herokuapp.com/api/v1/surveys/name/chutulu"
```

## Dumping the database to CSV
```
mongoexport -h nassdb-0.robot-with-feeling.8169.mongodbdns.com:27000 -d nass -c surveys -u username -p password --type=csv -f name,ownMachine,cs,gender,progExp,age,q1,q2,q3,q4,q5 --authenticationDatabase nass -o stuff.csv
```

Where the username and password are your username and password.  The command requires that mongodb is installed on your machine.  In OSX that's fairly straightforward if you have homebrew:

```
brew update
brew install mongodb
```

For windows, good luck:  

https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/

For team members I can make a linux box available to ssh into for mongo shell usage.

## Accessing the database through the mongo shell:

This assumes you have mongodb installed and you have a username and password:

mongo nassdb-0.robot-with-feeling.8169.mongodbdns.com:27000 --authenticationDatabase admin --username  username --password password
