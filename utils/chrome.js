const puppeteer = require('puppeteer')

exports.initChrome = async () => {
    global.browser = await puppeteer.launch({args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote'
        ]})
    global.pageObject = {}
}