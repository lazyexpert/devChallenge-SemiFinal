//let jsdom = require('jsdom').jsdom,
const http = require('http'),
    mail = "seo-mix@mail.ru",
    logger = require("../../logger"),
    FormData = require('form-data'),
    menu = require('../menu/mammamia')

// Feel free to set your email, to make sure order goes to the target
const CONTACT_EMAIL = "nospam@please.com"

// For testing launch "node mammamia.js anyarg
if( typeof process.argv[2] !== "undefined") {
  // It will send order with the following data
  doJob({
      "order":[{
        "type":"Пицца",
        "title":"Модильяни",
        "size":"Средняя",
        "count":"1"
      },
      {
        "type":"Напитки",
        "title":"Coca-Cola",
        "size":"default",
        "count":"2"
      }],
      "name":"Петр",
      "adress":"улица крещатик 35 квартира 200",
      "phone":"(093) 321-25-26",
      "date":"4/30/2016, 4:58:27 PM",
      "place":"Мамамия",
      "type":"Пицца"
    })
}

process.on('message', data => {
  doJob(data)
})

// Function forms hash property out from basket object
function formHash(basket) {
  let hash = ""
  if( basket.type ) hash = `${basket.type},`

  let internals = "{"

  // Loop through internals
  for(let t=0; t<basket.internals.length; t++) {
    // Loop thorugh internal properties
    for(let key in basket.internals[t]) {
      internals += `${key}:${basket.internals[t][key]},`
    }
  }

  return `${hash}${internals}}`
}

// Finds basket object in the menu data
function getBasketFromMenu(type, title, size) {
  let res = menu.filter(el => el.name == type)[0]
  return res.structure.type.filter(el => el.title == title)[0].basket[size]
}

// Fills basket with data totally ready for send
function fillBasket(order) {
  let items = order.order
  let counter = 0
  let basket = {}

  items.forEach(el => {
    let basketObj = getBasketFromMenu(el.type, el.title, el.size)
    let hash = formHash(basketObj)
    basketObj.hash = hash
    basketObj.count = el.count
    basket[counter++] = basketObj
  })

  return basket
}

// Performs request and collects stuff together
function doJob(order) {
  var formData = new FormData()

  var street = order.adress.match(/^([^\d]+)/)[1]
  var house = order.adress.match(/(\d+)/)[1]
  var note  = "Этот заказ отправлен с автоматического сервиса."
      note += "Желательно связаться с клиентом для уточнения деталей"
      note += `Просьба организовать доставку: ${new Date(order.date).toLocaleString()}`

  let basket = JSON.stringify(fillBasket(order))

  formData.append('lang', 'uk')
  formData.append('customer[name]', order.name)
  formData.append('shipping[type]', 'home')
  formData.append('shipping[street]', street)
  formData.append('shipping[building]', house)
  formData.append('shipping[flat]', order.adress)
  formData.append('customer[phone]', order.phone)
  formData.append('customer[email]', CONTACT_EMAIL)
  formData.append('shipping[comment]', note)
  formData.append('contactInfoCorrect', 'on')
  formData.append('basket', basket)


  var options = {
    host : "mamamia.ua",
    path : "/service/frontend/checkout/order",
    method: "post",
    headers : formData.getHeaders(),
    data : formData
  }

  var req = http.request(options)

  formData.pipe(req)

  req.on('response', function(res) {
    logger.log(`Бот маммамия: у нас получилось, заказ отправлен. Содержимое отправленной корзины: ${basket}`);
    process.exit()
  })
}

/* Example of orignial http post request formdata */
/*
lang:uk
customer[name]:неизвестный Герой
shipping[type]:home
shipping[street]:вул. Хрещатик
shipping[building]:35
shipping[flat]:никак, я сам вас найду
customer[phone]:0931233212
customer[email]:antispam@mail.com
shipping[comment]:це тестування
contactInfoCorrect:on
basket:
  { "2":
    {
      "type":"pizza",
      "title":"Модильяні",
      "price":99,
      "internals":
      [
        {
          "type":"base",
          "externalId":"24452",
          "title":"Середня",
          "price":46,
          "count":1
        },
        {"type":"sauce","externalId":"20277","title":"Томатний (класичний)","price":7,"count":1},
        {"type":"recipe","externalId":"21851","title":"Модильяні","price":0,"count":1}
      ],
      "count":1,
      "hash":"pizza,{count:1,externalId:24452,price:46,title:Середня,type:base,count:1,externalId:20277,price:7,title:Томатний (класичний),type:sauce,count:1,externalId:21851,price:0,title:Модильяні,type:recipe,}"
    }
  }
*/

/* Orignial (hash) is a description of the internals =>> look below
  {
    "title":"Фреш яблунчний 0.5",
    "price":95,
    "internals":[
      {"externalId":"24529","title":"Фреш яблунчний 0.5","count":1,"price":95}
    ],
    "count":2,
    "hash":"{count:1,externalId:24529,price:95,title:Фреш яблунчний 0.5,}"
  }
  {
    "type":"pizza",
    "title":"Модильяні",
    "price":99,
    "internals":[
      {"type":"base","externalId":"24452","title":"Середня","price":46,"count":1},
      {"type":"sauce","externalId":"20277","title":"Томатний (класичний)","price":7,"count":1},
      {"type":"recipe","externalId":"21851","title":"Модильяні","price":0,"count":1}
    ],
    "count":2,
    "hash":"pizza,{count:1,externalId:24452,price:46,title:Середня,type:base,count:1,externalId:20277,price:7,title:Томатний (класичний),type:sauce,count:1,externalId:21851,price:0,title:Модильяні,type:recipe,}"}}
*/
