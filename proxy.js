const http = require('http')

const handler = (req, res) => {
    const subreq = http.get('http://node:8732/chains/main/blocks', (subres) => {
        let data = ''
        subres.on('data', (chunk) => { data += chunk })
        subres.on('end', () => {
            res.end(data)
            data = JSON.parse(data)
            console.log(data)
        })
    })
    subreq.end()
}

http.createServer(handler).listen(8000)
