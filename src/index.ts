import http from "node:http"
import type { IncomingMessage, ServerResponse } from "node:http"
const PORT = 3000

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {

  const url = (req.url ?? "").split("?")[0]
  const method = req.method

  if (url === "/pokemon" && method === "POST") {
    
      const corps = await lireCorps(req)
      console.log("Corps de la requête :", corps)
      const nom = new URLSearchParams(corps).get("name")?.trim()

      const pokemon = await getSTUB(nom ?? "") 

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
      res.end(JSON.stringify({ pokemon }))
      return
    
  }

  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Not found" }))

})
server.listen(PORT, () => {
  console.log(`Serveur écoute sur http://localhost:${PORT}`)
})

function lireCorps(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let corps = ""
    req.setEncoding("utf8")
    req.on("data", (chunk: string) => { corps += chunk })
    req.on("end", () => resolve(corps))
    req.on("error", (err) => reject(err))
  })
}































interface STUB {
    name : string
}

function estSTUB(v: unknown): v is STUB {
    return typeof v === "object" && v !== null
           && "name" in v && typeof v.name === "string";
}

async function getSTUB(nom: string): Promise<STUB | undefined> {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nom}`)
        if (!res.ok) {
            return undefined
        }

        const reponse: unknown = await res.json()
        return estSTUB(reponse) ? reponse : undefined
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message)
        } else {
            console.log("Une erreur inconnue", err)
        }
        throw err
    }
}