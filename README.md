Occupy Lege Server
---

> Look up senators and representatives by address

Built for [ATXHackForChange 2015](http://atxhackforchange.org)

### Set up

npm install

### Run

npm start

### GET /api

Query Params

* Address1
* ZipCode
* City

### Test Locally

```
http://localhost:3000/api?ZipCode=78704&City=austin&Address1=3001+South+Congress+Avenue
```

Example response

```js
[
  {
    name: "Kirk Watson",
    firstName: "Kirk",
    lastName: "Watson",
    chamber: "State Senate",
    capitalPhone: "(512) 463-0114",
    email: "Kirk.Watson@senate.state.tx.us",
    districtPhone: ""
  },
  {
    name: "Eddie Rodriguez",
    firstName: "Eddie",
    lastName: "Rodriguez",
    chamber: "State House",
    capitalPhone: "(512) 463-0674",
    email: "Eddie.Rodriguez@house.state.tx.us",
    districtPhone: ""
  }
]
```

### License

MIT
