const yaml = require('js-yaml');
const fs = require('fs');
const {zip} = require("pythonic");
console.log(__dirname)
const str = fs.readFileSync(`${__dirname}/第いち課.yml`, 'utf8')
// console.log(str)
const doc = yaml.safeLoad(str);
let json = JSON.stringify(doc)
json = JSON.stringify(json)

console.log(doc);

function say(...s) {
    console.log(...s)
}

function all(...s) {
    console.log(s)
    let res = []
    let index = Array(s.length).fill(0)

    function loop(n) {
        if (n === index.length) {
            aa = []
            for (j = 0; j < s.length; j++) {
                aa.push(s[j][index[j]])
            }
            res.push(aa)
            return
        }
        for (let i = 0; i < s[n].length; i++) {
            index[n] = i
            loop(n + 1)
        }
    }

    loop(0)
    return res
}

// math = require('mathjs')

// a = zip([1, 1, 3], [1, 3, 5]).toArray()
// console.log(a)
names = [
    "佐藤"
    , "鈴木"
]

professions = doc['言葉']['职业']
charSuffixs = Object.entries(doc['言葉']['称呼'])
    .filter(([k, v]) => {
        return ['san', 'cyan'].includes(k)
    })
    .map(([k, v]) => {
        return v
    })
    // .reduce((a, b) => Object.assign(a, b))

console.log(charSuffixs)
names.forEach((name) => {
    say(`わらしは　${name} です。`)
})

all(names, charSuffixs, professions).forEach(
    ([name, charSuffix, profession]) => {
        // console.log(name, z)
        say(`${name}${charSuffix}は　${profession} です。`)
    })


