const http = require('http')

const handler = (req, res) => {
    let block, date
    const end = (block, date) => {
        if (block && date) {
            date = Math.round((new Date() - new Date(date))/1000)
            res.write('HELP Block\n')
            res.write('TYPE block gauge\n')
            res.write(`block ${block}\n`)
            res.write('HELP Time\n')
            res.write('TYPE time gauge\n')
            res.write(`time ${date}\n`)
            res.end()
        }
    }
    http.get('http://node:8732/chains/main/blocks', (subres) => {
        let data = ''
        subres.on('data', (chunk) => { data += chunk })
        subres.on('end', () => {
            console.log(data)
            data = JSON.parse(data)
            block = data[0][0]
            end(block, date)
        })
    }).end()
    http.get('http://node:8732/chains/main/blocks/head/header', (subres) => {
        let data = ''
        subres.on('data', (chunk) => { data += chunk })
        subres.on('end', () => {
            console.log(data)
            data = JSON.parse(data)
            date = data.timestamp
            end(block, date)
        })
    }).end()
}

http.createServer(handler).listen(8000)
