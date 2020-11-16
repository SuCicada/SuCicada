const yaml = require('js-yaml');
const fs   = require('fs');
const str = fs.readFileSync('第いち課.yml', 'utf8')
// console.log(str)
const doc = yaml.safeLoad(str);
let json = JSON.stringify(doc)
json = JSON.stringify(json)
console.log(doc);
