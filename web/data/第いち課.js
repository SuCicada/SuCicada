const yaml = require('js-yaml');
const fs = require('fs');
const {zip} = require("pythonic");
const str = fs.readFileSync('第いち課.yml', 'utf8')
// console.log(str)
const doc = yaml.safeLoad(str);
let json = JSON.stringify(doc)
json = JSON.stringify(json)

console.log(doc);

function say(...s) {
    console.log(...s)
}

function all(...s) {
    res = []
    indexs = s.map(arr => arr.length)
    zero = Array(indexs.length, 0)

    function loop(index) {
        for (i = 0; i < index.length; i++) {
            // aa = s.map(arr=>arr)
            index[i]++
            res.push()
            // loop(index)
            // loop
        }
    }

    loop(zero)

}

// math = require('mathjs')

a = zip([1, 1, 3], [1, 3, 5]).toArray()
console.log(a)
names = [
    "佐藤"
    , "鈴木"
]


names.forEach((name) => {
    say(`わらしは　${name} です。`)
})



