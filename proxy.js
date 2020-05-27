const http = require('http')

const handler = (req, res) => {
    http.get('http://node:8732/chains/main/blocks/head/header', (subres) => {
        let data = ''
        subres.on('data', (chunk) => { data += chunk })
        subres.on('end', () => {
            console.log(data)
            data = JSON.parse(data)
            const block = data.level
            const date = Math.round((new Date() - new Date(data.timestamp))/1000)
            res.write('HELP Block\n')
            res.write('TYPE block counter\n')
            res.write(`block ${block}\n`)
            res.write('HELP Time\n')
            res.write('TYPE time gauge\n')
            res.write(`time ${date}\n`)
            res.end()
        })
    }).end()
}

http.createServer(handler).listen(8000)
