# Sully

## Time allocation

I spent about 1.5 hours fighting Safari, selenium and some NPM peer dependencies.

I added this to the end time. All in all 5hrs-ish with last minute minor tidy up of console.logs etc...

## Using curl

I started by using curl to figure out the API. This helped me fix a ton of issues with browsers, unknown payloads, etc..

I left my curl documentation in the [RunningWithCurl.md](https://github.com/ezodude/sully/blob/master/RunningWithCurl.md) file.

## General issues

* As mentioned above, I had massive issues with Safari. In the end I fell back onto Firefox.

* I upgraded to the latest Selenium Jar while trying to get Safari to work: selenium-server-standalone-2.53.1.jar

* __Navigate to a URL__ didn't indicate the PAYLOAD. Found it here: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidvalue

* __Sending values__ didn't state that an array of chars needs to be sent. Found it here: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidvalue

## Testing

The basic test is found in [basicClient.js](https://github.com/ezodude/sully/blob/master/test/basicClient.js). To run this,


* Run selenium:
```
java -jar selenium-server-standalone-2.53.1.jar 
```

* Navigate to the root of the project and type:
```
npm test
```

It uses Firefox to run 2 tests:
* Can navigate to google.
* Can search for the BBC.

```
  Basic Selenium Client
    ✓ can navigate to google (1702ms)
    ✓ can search google for the BBC (6660ms)


  2 passing (10s)
```

### Issues

- I had to add a setTimeout of about 1000 milliseconds while searching for an element. This was needed to workaround page refreshes.

## Implementation

I use [highland.js](http://highlandjs.org/) internally to create an intuitive API for the library.

Every method call adds an async JsonWireProtocol request into an actions array. A call to ```.val()``` reduces all the functions to one final stream.

Finally, I consume the stream in series & evaluate the last response's body value as the end result.
