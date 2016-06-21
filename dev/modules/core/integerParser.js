/* You may continue here.. If you feel enough power =) */
var numbers = [
  {
    "title" : "0",
    "spell" : [/ноль/g, /нуль/g],
  },
  {
    "title" : "1",
    "spell" : [/один/g, /одна/g, /одну/g, /час/g],
  },
  {
    "title" : "2",
    "spell" : [/два/g, /две/g],
  },
  {
    "title" : "3",
    "spell" : [/три/g],
  },
  {
    "title" : "4",
    "spell" : [/четыре/g],
  },
  {
    "title" : "5",
    "spell" : [/пять/g],
  },
  {
    "title" : "6",
    "spell" : [/шесть/g],
  },
  {
    "title" : "7",
    "spell" : [/семь/g],
  },
  {
    "title" : "8",
    "spell" : [/восемь/g],
  },
  {
    "title" : "9",
    "spell" : [/девять/g],
  },
  {
    "title" : "10",
    "spell" : [/десять/g],
  }
]

module.exports = {
  replace : function(str) {
    for( let t = 0; t < numbers.length; t++ ) {
      for( let j = 0; j < numbers[t].spell.length; j++) {
        let regexp = numbers[t].spell[j]
        if( regexp.test(str) ) {
          str = str.replace(regexp, numbers[t].title)
        }
      }
    }
    return str
  },
  parse : function(str) {
    return this.replace(str).match(/(\d+)/)[1]
  }
}
