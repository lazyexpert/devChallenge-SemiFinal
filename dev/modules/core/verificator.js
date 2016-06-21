/* Standalone execution for sync flow*/
/* As far as interface of new modules is the same - this file will be common */
var path = require('path'),
    fs = require('fs'),
    intParser = require('./integerParser'),
    logger = require('../logger'),
    timezone = require('./timezone'),
    menu

function returnError(err) {
  process.send({ err : `Ошибка верификатора: ${err}` })
}

/*
  Input example:
  заказ
    пицца модильяни средняя одна штука
      и
    напиток кока кола две штуки
  на имя александр
  адрес улица крещатик 35 квартира 200
  номер телефона 093 321 25 26
  дата 02.04.2016г в 18-00
*/

process.on('message', data => {
  let RESPONSE = {
    "order" : [],
    "name" : "",
    "adress" : "",
    "phone" : "",
    "date" : ""
  }

  if(!data.menu )
    returnError("не передан аргумент \"меню\"")

  menu = require(data.menu)


  if(!data.str )
      returnError("не передан аргумент \"данные заказа\"")

  let content = data.str.split(" ")
  content.splice(0,1)
  content = content.join(" ")

  try {
    var chunk = content.split(/на имя/)
    var left = chunk[1]
    RESPONSE.order = chunk[0].replace(/\s$/, "")
  } catch(e) {
    return returnError("не найдено ключевое слово \"на имя\"")
  }

  try {
    chunk = left.split(/адрес/)
    left = chunk[1]
    RESPONSE.name = chunk[0].replace(/\s/g, "")
    let arr = RESPONSE.name.split("")
    arr[0] = arr[0].toUpperCase()
    RESPONSE.name = arr.join("")
  } catch(e) {
    return returnError("не найдено ключевое слово \"адрес\"")
  }

  try {
    chunk = left.split(/номер телефона/)
    left = chunk[1]
    RESPONSE.adress = chunk[0].replace(/\s$/, "").replace(/^\s/, "")
  } catch(e) {
    return returnError("не найдено ключевое слово \"номер телефона\"")
  }

  try {
    chunk = left.split(/дата/)
    RESPONSE.phone = formatPhone(chunk[0].replace(/\s/g, ""))
    RESPONSE.date = chunk[1].replace(/^\s/, "")
  } catch(e) {
    return returnError("не найдено ключевое слово \"дата\"")
  }

  RESPONSE.order = verifyOrder(RESPONSE.order)

  RESPONSE.date = parseDate(RESPONSE.date).toLocaleString()

  formatPhone(RESPONSE.phone)

  process.send({ response : RESPONSE })
})


/*
  Verify order according to menu
  return array of objects:
  {
    type
    title
    size
    count
  }
  if not verified return false

*/
function verifyOrder(order) {
  // check for multiple items
  let arr = [],
      output = []

  if( /\sи\s/.test(order) ) {
    arr = order.split(/\sи\s/)
  } else arr.push( order )

  // Each parsed item
  for( let t = 0; t < arr.length; t++ ) {
    let item = arr[t],
        found = false,
        type = {},
        title = "",
        size = "",
        count = ""

    /* Define type */
    // Each item in menu
    for( let j = 0; j < menu.length; j++ ) {
      if(found) break

      // Each spell variant
      for( let k = 0; k < menu[j].spell.length; k++ ) {
        if( menu[j].spell[k].test(item) ) {
          found = true
          type = menu[j]
          break
        }
      }
    }

    if( !found ) return returnError("не найден тип продукта")
    found = false

    /* Define good name */
    // Each menu item
    for( let j = 0; j < type.structure.type.length; j++ ) {
      if( found ) break

      let good = type.structure.type[j]

      // Each spell variant
      for( let k = 0; k < good.spell.length; k++ ) {
        if( good.spell[k].test(item) ) {
          found = true
          title = good.title
          break
        }
      }
    }

    if( !found ) return returnError("не найден продукт (заказ)")
    found = false

    /* Define good size */
    if( type.structure.size == 'default') {
      size = 'default'
      found = true
    } else {
      for( let j = 0; j < type.structure.size.length; j++ ) {
        if( found ) break

        for( let k = 0; k < type.structure.size[j].spell.length; k++) {
          if( type.structure.size[j].spell[k].test(item) ) {
            found = true
            size = type.structure.size[j].title
            break
          }
        }
      }
    }

    if( !found ) return returnError("не найден размер продукта (заказ)")
    found = false

    /* Define count */
    try {
      count = intParser.parse(item)
      found = true
    } catch (e){}

    if( !found ) return returnError("не найдено количество (заказ)")

    output.push({
      type : type.name,
      title : title,
      size : size,
      count : count
    })


  }

  return output
}

function formatPhone(num) {
  let arr = num.split("").reverse()
  arr.splice(2,0,"-")
  arr.splice(5,0,"-")
  if(arr.length > 9) {
    arr.splice(9,0," ")
    arr.splice(10,0,")")
    arr.splice(14,0,"(")
  }
  return arr.reverse().join("")
}

// Date can be "сейчас"
function parseDate(date) {
  if( /сейчас/.test(date) ) {
    return timezone.offset(new Date(), 3)
  } else {
    try {
      let arr = date.split(/\sв\s/),
          dateArr = arr[0].replace(/[^\d.]/g, "").split("."),
          dateNew = new Date(`${dateArr[1]},${dateArr[0]}, ${dateArr[2]}`),
          dateInMs = dateNew.getTime(),
          timeArr = intParser.replace(arr[1]).replace(/[^\d]/g, "").replace(/\s/g, "").split(""),
          hours = +`${timeArr[0]}${timeArr[1]}`,
          minutes = `${timeArr[2]}${timeArr[3]}`

      dateInMs += hours * 60 * 60 * 1000
      dateInMs += minutes * 60 * 1000
      return new Date(dateInMs)
    } catch(e){
      return returnError("проблема с разбором даты и времени")
    }
  }
}
