# STRUCTURE AND SCALABILITY
Basically the application idea is build around configurations:
- menu
- bot behavior
- report handlers

App easily scales at:
- adding/removing new order type (core method "regOrderType")
- adding/removing order places for exact type (core method "regOrderPlace")
- adding/removing report handlers for successfully executed orders (core method
  "regReportHandler")
All these usage examples are shown in core method "init"

## Menu
Path for menu file example:
"output/modules/core/menu/mammamia.js"
To scale - simply edit existing, or add you own (and register type/place)

## Behavior
Path for bot behavior file example:
"output/modules/core/behavior/mammamia.js"
To scale - add your bot behaviour to the same directory and register its
behaviour in the core.( regOrderPlace)

You may set email to make sure order goes to the target and is received in the
file of the bot behavior:
"output/modules/core/behavior/mammamia.js"
or if using with gulp:
"dev/modules/core/behavior/mammamia.js"
vairable - 'CONTACT_EMAIL'


## Report Handler
Report handler is basically a function.
You can reg some of them in the core, method "regReportHandler".
Function handler accepts one argument - order object.

# ORDER SYNTAX
заказать {{type}}
место {{place}}
заказ {order_details_shoud_fit_menu_file} [и {order_details_shoud_fit_menu_file}]
на имя {{name}}
адрес {{adress}}
номер телефона {{phone}} // is formatting mobile, home, with or without country code
дата {{date}} в {{time}} // or "сейчас"

If you cannot reproduce correct speech. You can test other parts of the
application this way:
- front end "main.js" switch global "DEBUG" to "TRUE"
- this will lead to short execution cycle, without speech recognition, passing
simply predefined text (you can edit the text itself in the same file (method
"stopRec"))
- you still have to push record and stop button( but its imitation, basically )

This is how you should spell your command:
"Заказать пиццу. Место мамамия. Заказ: пицца модильяни средняя одна штука и
напиток кока-кола две штуки на имя Петр адрес ул.Светлицкого 35, квартира
один номер телефона 093-333-33-33 дата 29.04.2016."

## Hints:
- Dont speak to fast and try to speak accurate (speech is being translated to
  text real time)
- Try to spell date on one breath, so that parser parses it as a date string
  (only date, not time)

You will have ability to check if you speech is recognized correctly and
aproove your order.

# SPEECH RECOGNITION
Is implemented through Yandex Speech Kit API (if to compare trial periods looks
better than Google Web Speech API).
The speech is transformed to text. Text is send to backend where it is verified
and transformed to an object.

The yandex API-key is free for the first month of usage. I've used one for
development and I'm going to pass one to you for checking. It will be activated
on the first API usage.

# ERROR HANDLING
The major errors come from parsing/verification of speech.
Each one is handeled separately and passed to front-end, that shows user where
the problematic part of the speech is and user can retry.

# QUEUE
The queue is made for upcoming orders. They are saved and managed through
mongodb for all users.

Front can delete items from queue.

Back can show exact list of orders for exact user.

When server is launched core module checks each 1 minute (if its time to make
any orders in the queue).
