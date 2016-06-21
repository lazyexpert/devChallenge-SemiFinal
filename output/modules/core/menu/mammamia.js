"use strict";

/*
  "Spell" property is trying to hold all possible variants of the property pronounce,
  including speech recognition software outputs (sure needs to fill more variants)
  Size can be default or custom ("большая", "средняя", "XL")
*/

/*
  Basket property of each object
  is exact representation of the original post object
*/
module.exports = [{
  "name": "Пицца",
  "structure": {
    "size": [{
      "title": "Средняя",
      "spell": [/средняя/, /средне/]
    }, {
      "title": "Большая",
      "spell": [/большая/]
    }, {
      "title": "XL",
      "spell": [/икс ель/]
    }],
    "type": [{
      "title": "Модильяни",
      "spell": [/модильяни/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Модильяні",
          "price": 99,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "21851", "title": "Модильяні", "price": 0, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Модильяні",
          "price": 164,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "21851", "title": "Модильяні", "price": 0, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Модильяні",
          "price": 300.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "21851", "title": "Модильяні", "price": 0, "count": 1 }]
        }
      }
    }, {
      "title": "Пекин Дак Хаус",
      "spell": [/пекин дак хаус/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Пекін Дак Хауз",
          "price": 107,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20131", "title": "Пекін Дак Хауз", "price": 54, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Пекін Дак Хауз",
          "price": 180,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20131", "title": "Пекін Дак Хауз", "price": 54, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Пекін Дак Хауз",
          "price": 332.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20131", "title": "Пекін Дак Хауз", "price": 54, "count": 1 }]
        }
      }
    }, {
      "title": "Вирджин",
      "spell": [/вирджин/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Вірджин",
          "price": 101,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20283", "title": "Рікота (білий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20045", "title": "Вірджин", "price": 48, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Вірджин",
          "price": 168,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20283", "title": "Рікота (білий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20045", "title": "Вірджин", "price": 48, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Вірджин",
          "price": 308.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20283", "title": "Рікота (білий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20045", "title": "Вірджин", "price": 48, "count": 1 }]
        }
      }
    }, {
      "title": "Трюфели с артишоком",
      "spell": [/трюфели с артишоком/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Трюфелі з артишоком",
          "price": 148,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20283", "title": "Рікота (білий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "22339", "title": "Трюфелі з артишоком", "price": 0, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Трюфелі з артишоком",
          "price": 262,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20283", "title": "Рікота (білий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "22339", "title": "Трюфелі з артишоком", "price": 0, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Трюфелі з артишоком",
          "price": 496.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20283", "title": "Рікота (білий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "22339", "title": "Трюфелі з артишоком", "price": 0, "count": 1 }]
        }
      }
    }, {
      "title": "BBQ",
      "spell": [/би би кью/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "BBQ",
          "price": 99,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20297", "title": "BBQ", "price": 46, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "BBQ",
          "price": 164,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20297", "title": "BBQ", "price": 46, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "BBQ",
          "price": 300.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20297", "title": "BBQ", "price": 46, "count": 1 }]
        }
      }
    }, {
      "title": "Годфазер",
      "spell": [/годфазер/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Годфазер",
          "price": 107,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20057", "title": "Годфазер", "price": 54, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Годфазер",
          "price": 180,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20057", "title": "Годфазер", "price": 54, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Годфазер",
          "price": 332.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20057", "title": "Годфазер", "price": 54, "count": 1 }]
        }
      }
    }, {
      "title": "Паперони Спайс",
      "spell": [/паперони спайс/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Папероні Спайс",
          "price": 91,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20124", "title": "Папероні Спайс", "price": 38, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Папероні Спайс",
          "price": 148,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20124", "title": "Папероні Спайс", "price": 38, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Папероні Спайс",
          "price": 268.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20124", "title": "Папероні Спайс", "price": 38, "count": 1 }]
        }
      }
    }, {
      "title": "Мит Суприм",
      "spell": [/мит суприм/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Міт Супрім",
          "price": 128,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20102", "title": "Міт Супрім", "price": 75, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Міт Супрім",
          "price": 222,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20102", "title": "Міт Супрім", "price": 75, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Міт Супрім",
          "price": 416.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20102", "title": "Міт Супрім", "price": 75, "count": 1 }]
        }
      }
    }, {
      "title": "Мамамия",
      "spell": [/мамамия/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Мамаміа!",
          "price": 99,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20302", "title": "Мамаміа!", "price": 46, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Мамаміа!",
          "price": 164,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20302", "title": "Мамаміа!", "price": 46, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Мамаміа!",
          "price": 300.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20302", "title": "Мамаміа!", "price": 46, "count": 1 }]
        }
      }
    }, {
      "title": "Гаваи",
      "spell": [/гаваи/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Гаваї",
          "price": 84,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20050", "title": "Гаваї", "price": 31, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Гаваї",
          "price": 134,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20050", "title": "Гаваї", "price": 31, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Гаваї",
          "price": 240.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20050", "title": "Гаваї", "price": 31, "count": 1 }]
        }
      }
    }, {
      "title": "Диабло",
      "spell": [/диабло/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Дьябло",
          "price": 91,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20067", "title": "Дьябло", "price": 38, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Дьябло",
          "price": 148,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20067", "title": "Дьябло", "price": 38, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Дьябло",
          "price": 268.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20280", "title": "Барбекю (гострий)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20067", "title": "Дьябло", "price": 38, "count": 1 }]
        }
      }
    }, {
      "title": "Кантри",
      "spell": [/кантри/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Кантрі",
          "price": 99,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20079", "title": "Кантрі", "price": 46, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Кантрі",
          "price": 164,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20079", "title": "Кантрі", "price": 46, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Кантрі",
          "price": 300.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20079", "title": "Кантрі", "price": 46, "count": 1 }]
        }
      }
    }, {
      "title": "Чиз Суприм",
      "spell": [/чиз суприм/],
      "basket": {
        "Средняя": {
          "type": "pizza",
          "title": "Чіз Супрім",
          "price": 113,
          "internals": [{ "type": "base", "externalId": "24452", "title": "Середня", "price": 46, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20138", "title": "Чіз Супрім", "price": 60, "count": 1 }]
        },
        "Большая": {
          "type": "pizza",
          "title": "Чіз Супрім",
          "price": 192,
          "internals": [{ "type": "base", "externalId": "24449", "title": "Велика", "price": 58, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20138", "title": "Чіз Супрім", "price": 60, "count": 1 }]
        },
        "XL": {
          "type": "pizza",
          "title": "Чіз Супрім",
          "price": 356.5,
          "internals": [{ "type": "base", "externalId": "24455", "title": "XL", "price": 88.5, "count": 1 }, { "type": "sauce", "externalId": "20277", "title": "Томатний (класичний)", "price": 7, "count": 1 }, { "type": "recipe", "externalId": "20138", "title": "Чіз Супрім", "price": 60, "count": 1 }]
        }
      }
    }]
  },
  "spell": [/пицца/, /пиццу/, /пиццы/],
  "web": "Піца"
}, {
  "name": "Напитки",
  "structure": {
    "size": "default",
    "type": [{
      "title": "Домашний лимонад с розмарином",
      "spell": [/домашний лимонад с розмарином/, /лимонад с розмарином/],
      "basket": {
        "default": {
          "title": "Домашній лимонад із розмарином 0.25 мл.",
          "price": 30,
          "internals": [{ "externalId": "24466", "title": "Домашній лимонад із розмарином 0.25 мл.", "count": 1, "price": 30 }]
        }
      }
    }, {
      "title": "Фреш буряка",
      "spell": [/фреш из буряка/, /фреш буряка/, /буряковый фреш/],
      "basket": {
        "default": {
          "title": "Фреш буряка 0.5",
          "price": 95,
          "internals": [{ "externalId": "24525", "title": "Фреш буряка 0.5", "count": 1, "price": 95 }]
        }
      }
    }, {
      "title": "Фреш селери",
      "spell": [/фреш селеры/, /фреш из селеры/],
      "basket": {
        "default": {
          "title": "Фреш селери 0.5",
          "price": 95,
          "internals": [{ "externalId": "24528", "title": "Фреш селери 0.5", "count": 1, "price": 95 }]
        }
      }
    }, {
      "title": "Фреш морковный",
      "spell": [/фреш морковный/, /морковный фреш/, /фреш из моркови/],
      "basket": {
        "default": {
          "title": "Фреш моркв&#8217;яний 0.5",
          "price": 95,
          "internals": [{ "externalId": "24527", "title": "Фреш моркв&#8217;яний 0.5", "count": 1, "price": 95 }]
        }
      }
    }, {
      "title": "Фреш яблочный",
      "spell": [/фреш яблочный/, /фреш из яблок/, /яблочный фреш/],
      "basket": {
        "default": {
          "title": "Фреш яблунчний 0.5",
          "price": 95, "internals": [{ "externalId": "24529", "title": "Фреш яблунчний 0.5", "count": 1, "price": 95 }]
        }
      }
    }, {
      "title": "Томатный гаспачо",
      "spell": [/томатный гаспачо/, /гаспачо томатный/],
      "basket": {
        "default": {
          "title": "Томатний гаспачо 1л.",
          "price": 99,
          "internals": [{ "externalId": "24554", "title": "Томатний гаспачо 1л.", "count": 1, "price": 99 }]
        }
      }
    }, {
      "title": "Bonaqua",
      "spell": [/бонаква/, /bonaqua/, /бон аква/],
      "basket": {
        "default": {
          "title": "Bonaqua 0.5L",
          "price": 20,
          "internals": [{ "externalId": "00323", "title": "Bonaqua 0.5L", "count": 1, "price": 20 }]
        }
      }
    }, {
      "title": "Спирулиновый смузи Чарли в бутылке",
      "spell": [/спирулиновый смузи чарли в бутылке/, /спирулиновый смузи/, /спирулиновый смузи чарли/, /чарли спирулиновый смузи/],
      "basket": {
        "default": {
          "title": "Спіруліновий смузі Чарлі в пляшці",
          "price": 45,
          "internals": [{ "externalId": "24470", "title": "Спіруліновий смузі Чарлі в пляшці", "count": 1, "price": 45 }]
        }
      }
    }, {
      "title": "Фреш апельсиновый",
      "spell": [/фреш апельсиновый/, /апельсиновый фреш/, /фреш из апельсинов/],
      "basket": {
        "default": {
          "title": "Фреш помаранчевий 0.5",
          "price": 95,
          "internals": [{ "externalId": "24480", "title": "Фреш помаранчевий 0.5", "count": 1, "price": 95 }]
        }
      }
    }, {
      "title": "Фреш грейпфрутовый",
      "spell": [/фреш грейпфрутовый/, /грейпфрутовый фреш/],
      "basket": {
        "default": {
          "title": "Фреш грейпфрутовий 0.5",
          "price": 95,
          "internals": [{ "externalId": "24481", "title": "Фреш грейпфрутовий 0.5", "count": 1, "price": 95 }]
        }
      }
    }, {
      "title": "Coca-Cola",
      "spell": [/кока кола/, /coca cola/, /cocacola/, /кокакола/],
      "basket": {
        "default": {
          "title": "Coca-Cola 0.5",
          "price": 20,
          "internals": [{ "externalId": "00321", "title": "Coca-Cola 0.5", "count": 1, "price": 20 }]
        }
      }
    }, {
      "title": "Сок апельсиновый",
      "spell": [/сок апельсиновый/, /апельсиновый сок/],
      "basket": {
        "default": {
          "title": "Сік помаранчевий 1.0",
          "price": 35,
          "internals": [{ "externalId": "00317", "title": "Сік помаранчевий 1.0", "count": 1, "price": 35 }]
        }
      }
    }, {
      "title": "Сок яблочный",
      "spell": [/сок яблочный/, /яблочный сок/],
      "basket": {
        "default": {
          "title": "Сік яблучний 1.0",
          "price": 35,
          "internals": [{ "externalId": "22341", "title": "Сік яблучний 1.0", "count": 1, "price": 35 }]
        }
      }
    }, {
      "title": "Сок томатный",
      "spell": [/сок томатный/, /томатный сок/],
      "basket": {
        "default": {
          "title": "Сік томатний 1.0",
          "price": 35,
          "internals": [{ "externalId": "00319", "title": "Сік томатний 1.0", "count": 1, "price": 35 }]
        }
      }
    }, {
      "title": "Hoegaarden белое",
      "spell": [/хоегарден белое/],
      "basket": {
        "default": {
          "title": "Hoegaarden біле 0,5",
          "price": 50,
          "internals": [{ "externalId": "22895", "title": "Hoegaarden біле 0,5", "count": 1, "price": 50 }]
        }
      }
    }, {
      "title": "Leffe темное",
      "spell": [/пиво леффе темное/],
      "basket": {
        "default": {
          "title": "Leffe темне 0.5",
          "price": 50,
          "internals": [{ "externalId": "21027", "title": "Leffe темне 0.5", "count": 1, "price": 50 }]
        }
      }
    }, {
      "title": "Stella Artois",
      "spell": [/пиво стела артуа/],
      "basket": {
        "default": {
          "title": "Stella Artois 0.5",
          "price": 27,
          "internals": [{ "externalId": "012620", "title": "Stella Artois 0.5", "count": 1, "price": 27 }]
        }
      }
    }, {
      "title": "Stella Artois (б/а)",
      "spell": [/пиво стела артуа безалкогольное/],
      "basket": {
        "default": {
          "title": "Stella Artois (б/а) 0.5",
          "price": 27, "internals": [{ "externalId": "12426", "title": "Stella Artois (б/а) 0.5", "count": 1, "price": 27 }]
        }
      }
    }]
  },
  "spell": [/напиток/, /напитки/],
  "web": "Напої"
}];