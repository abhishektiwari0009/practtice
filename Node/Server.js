const http = require('http')
http.createServer((req,res)=>{
    res.write("hello, welcome to node js ")
    res.write("hi this is nodemon")
    res.end()
})
.listen(3000,()=>{
    console.log('Server is running on port 3000')
})