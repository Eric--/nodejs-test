"use strict";

class People {


    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log('hi ' + this.name + ' !');
    }

    printFor(){
        var a = [];
        for (var i = 0; i < 10; i++) {
          a[i] = function(){
            console.log(i);
          }
        }
        a[6]();
    }

    testConst(){
      const a = "abc";
      // a = "efg";
      console.log(a);
    }

    testVar(){
      let x = 1, y = 2;
//      [x, y] = [y, x];
      console.log('x=' + x);
      console.log('y=' + y);
    }

    testMap(){
      var map = new Map();
      map.set("first", "hello");
      map.set("second", "world");

      // for(let [key, value] of map){
      //   console.log(key + " is " + value);
      // }
    }

    testStr(){
      var str = `In Javascript
       is a line-feed.`;
      // console.log(str);
      var name = "xiaolong", time = "today";
      str = `hello ${name}, how are you ${time}`;
      // console.log(str);
      var $div = document.createElement('div');
      $div.innerHTML = `
        <ul>
          <li>first</li>
          <li>second</li>
        </ul>
      `;
      document.getElementById("es6").appendChild($div);

      let str1 = 'return ' + '`Hello ${name}!`';
      let fun = new Function('name', str1);
      console.log(fun('Jack'));
    }

    testSet(){
        var arr = new Array(1, 2, 3);
        var set = new Set(arr);
        set.add("a");
        for(let item of set){
          console.log(item);
        }
    }

    testMap(){
      var map = new Map();
      map.set("name", "xiaolong");
      var val = map.get("name");
      console.log(val);
    }

    set prop(val){
      this.age = val;
      console.log(self);
    }

    get prop(){
      return this.age;
    }

    static getEle(){
      return 'ddd';
    }

    static sayEle(){
      return People.getEle();
    }

    static calcEggs(total){
      var arr = [];
      for(var i = 0; i < total; i++){
        if(i%2 == 1 && i%3 == 0 && i%4 == 1 && i%5 == 1 && i%6 == 3 && i%7 == 0 && i%8 == 1 && i%9 == 0){
          arr.push(i);
        }
      }
      return arr.join(",");
    }

}

module.exports = People;
