# Running with curl

## Create session

```
curl -X POST http://127.0.0.1:4444/wd/hub/session -d '{"desiredCapabilities": {"browserName": "safari", "platform": "MAC"}}'
```
Result
```
"sessionId":"c78b8d63-a689-4517-9901-586a79092712"
```

## Navigate to URL

```
curl -X POST http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/url -d '{"url": "http://www.google.com"}'
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":null,"class":"org.openqa.selenium.remote.Response","hCode":1560208623}
```

## Get title

```
curl -X GET http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/title
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":"Google","class":"org.openqa.selenium.remote.Response","hCode":232797499}
```

## Find search box element

```
curl -X POST http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/element -d '{"using": "css selector", "value": "input#lst-ib.gsfi"}'
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":{"ELEMENT":"0"},"class":"org.openqa.selenium.remote.Response","hCode":1400120190}
```

## Type a string into the search box element

```
curl -X POST http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/element/0/value -d '{"value": ["b", "b", "c"]}'
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":null,"class":"org.openqa.selenium.remote.Response","hCode":802928030}
```

## Find the element representing the search button

```
curl -X POST http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/element -d '{"using": "css selector", "value": "div#sblsbb button.lsb"}'
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":{"ELEMENT":"2"},"class":"org.openqa.selenium.remote.Response","hCode":680346857}
```

## Click the search button

```
curl -X POST http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/element/2/click 
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":{"ELEMENT":"1"},"class":"org.openqa.selenium.remote.Response","hCode":2077496657}
```

## Find the element for search results

```
curl -X POST http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/element -d '{"using": "css selector", "value": "div.f.kv._SWb cite"}'
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":{"ELEMENT":"3"},"class":"org.openqa.selenium.remote.Response","hCode":1146586674}
```

## Get text for result element

```
curl -X GET http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712/element/3/text
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":"www.bbc.co.uk/","class":"org.openqa.selenium.remote.Response","hCode":876680184}
```

## Kill session

```
curl -X DELETE http://127.0.0.1:4444/wd/hub/session/c78b8d63-a689-4517-9901-586a79092712
```

Result
```
{"sessionId":"c78b8d63-a689-4517-9901-586a79092712","status":0,"state":"success","value":null,"class":"org.openqa.selenium.remote.Response","hCode":135475669}
```