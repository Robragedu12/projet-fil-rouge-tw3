import http from "node:http"

const PORT = 3000

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Bonjour depuis Node.js")
})

server.listen(PORT, () => {
  console.log(`Serveur écoute sur http://localhost:${PORT}`)
})