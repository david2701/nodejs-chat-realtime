const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const consign = require('consign')
const PORT = process.env.PORT || 3000

var msgs = []

consign().then('./src/config/').then('./src/routes.js').into(app)

io.on('connection', (socket) => {
    console.log(`${socket.id} conectado`)
    
    socket.on("requestMessages", data => {
        socket.emit("listMessages", msgs)
    })

    socket.on("sendMessage", data => {
        msgs.push(data)
        socket.broadcast.emit("receiveMessage", data);
    })
})

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})