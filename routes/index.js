const router = require('koa-router')()


router.post('/', async (ctx, next) => {
  const idCard = ctx.request.body.idCard
  const name = ctx.request.body.name
  const pageObject = global.pageObject

  ctx.redirect('/validateCode')

})

router.get('/validateCode', async (ctx, next) => {
  let idCard = '130984199811070018'
  let name = '宋天琪'
  const browser = global.browser
  const pageObject = global.pageObject
  const page = await browser.newPage()

  await page.goto('http://yzb2.ustc.edu.cn/cjcx')
  await page.type('#zjhm', `${idCard}`, {delay: 200})
  await page.type('#xm', `${name}`, {delay: 100})
  const img = await page.$("#validateCodeImg")
  const base64 = await img.screenshot({ encoding: "base64" });
  pageObject[idCard] = page
  ctx.body = `<img src="data:image/png;base64,${base64}"/>`
})

router.get('/searchScore', async (ctx, next) => {
  let idCard = '130984199811070018'
  let name = '宋天琪'
  let pageObject = global.pageObject
  let page = pageObject[idCard]
  let validateCode = ctx.request.query.validateCode
  let error

  await page.type('#code', `${validateCode}`, {delay: 100})
  await page.keyboard.press(String.fromCharCode(13))
  await page.waitForNavigation({waitUntil: 'load'});
  if(page.url() === 'http://yzb2.ustc.edu.cn/cjcx') throw new Error('验证码错误')

  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('.result td'))
    return tds.map(td => td.innerHTML)
  });
  let score = {}
  score['zhengzhi'] = data[2]
  score['english'] = data[5]
  score['math'] = data[8]
  score['computer'] = data[11]
  score['all'] = data[13]

  ctx.body = score
})

module.exports = router
