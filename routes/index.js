const router = require('koa-router')()
const { createWorker } = require('tesseract.js')
const worker = createWorker();

async function getTextFromImage(imgUrl) {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log(text);
  await worker.terminate();
}

router.get('/', async (ctx, next) => {
  let text = await getTextFromImage('https://tesseract.projectnaptha.com/img/eng_bw.png')
  console.log(text)
  ctx.body = text
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
