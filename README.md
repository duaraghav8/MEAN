# MEAN
Scripts I wrote while learning MEAN Development. For my own use and reference.


##Curl Commands involving Cookies:

curl -X POST -i -H "Content-type: application/json" http://domainName.com/login -d '{"email":"<EMAIL>","password":"<PASSWORD>"}'

Above step sends back a set-cookie field in the header. The value of set-cookie header field contains <KEY>&<VALUE> for the next statement (making all subsequent calls with that cookie)

curl -X GET http://domainName.com/profile --cookie "<KEY>=<VALUE>"
