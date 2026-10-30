const path = require('node:path')
let basename = path.basename('./src/index.html')
console.log(basename)

let ext = path.extname('ttps://www.geeksforgeeks.org/node-js/nodejs-path-module/index.html')
console.log(ext)
let dir = path.dirname('https://apple.com/')
console.log(dir)
let url = path.join('node', 'src' , 'abc.js')
console.log(url)
let a = path.format({
    root: '',
    dir: 'https://www.geeksforgeeks.org/node-js/nodejs-path-module/index.html',
    base: 'index.html',
    ext: '.html',
    name: 'index'
})
console.log(a)
let parse = path.parse('https://www.geeksforgeeks.org/node-js/nodejs-path-module/index.html')
console.log(parse)