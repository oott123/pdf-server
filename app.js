const http = require('http')
const read = require('./read')
const pdf = require('./pdf')

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/html' && req.method === 'POST') {
      const html = (await read(req)).toString()
      const result = await pdf(html)
      
      res.setHeader('Content-Type', 'application/pdf')
      res.write(result)
      res.end()
    }
  } catch (e) {
    res.statusCode = 500
    res.write(e.toString())
    res.end()
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`server started on port ${port}`)
})
