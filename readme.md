# Download this repo
```bash
$ git clone https://github.com/padiazg/async-function-issue.git
```
# Deploy function
```bash
$ cd async-function-issue
$ faas-cli up --skip-push
```
# Run receiver
```bash
$ cd callback
$ npm i
$ node .
```
# Test
The IP of my machine at running the test was `192.168.1.112`, so you should change it accordingly

The function receives as it's parameter the timeout that should wait before sending the response, if not specified a default value of 2000 is asumed.

### Successful Test
```bash
# call with a 3000 ms delay
$ curl -X POST -d 3000 -H "X-Callback-Url: http://192.168.1.112:3000/webhook" http://192.168.1.112:8080/async-function/function
```
At the console of the callback yo should see something like this
````bash
$ node callback\
Server listenig at :::3000

Incoming
webhook/POST
webhook/POST received => {"status":"done"}

--------------------------------------------------------------------------
```

### Unsuccessful Test
```bash
# call with a 5000 ms delay
$ curl -X POST -d 5000 -H "X-Callback-Url: http://192.168.1.112:3000/webhook" http://192.168.1.112:8080/async-function/function
```

For some reason is the function takes more than 5s to respond, the callback is not called, even if the log from the function shows that it finished an wrote to the output.
```bash
$ docker service logs -f function
...
function.1.0w8cz4u4k0o9@linuxkit-00155d630105    | 2018/10/19 02:22:11 Forking fprocess.
function.1.0w8cz4u4k0o9@linuxkit-00155d630105    | 2018/10/19 02:22:16 Wrote 18 Bytes - Duration: 5.191428 seconds
...
```
Something curious is that I specified higher timeouts at the stack.yml, but the result is the same.  
