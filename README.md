# MEAN
Scripts I wrote while learning MEAN Development. For my own use and reference.


##Curl Commands involving Cookies:

curl -X POST -i -H "Content-type: application/json" http://domainName.com/login -d '{"email":"EMAIL","password":"PASSWORD"}'

Above step sends back a set-cookie field in the header. The value of set-cookie header field contains KEY & VALUE for the next statement (making all subsequent calls with that cookie)

curl -i -X GET http://domainName.com/profile --cookie "KEY=VALUE"

has a file **cluster.js** demonstrating a clustered server under cluster branch

Repo contains mainly code samples from Angular.js, Node+Express along with shitloads of D3.js practice scripts.
I <3 JS
