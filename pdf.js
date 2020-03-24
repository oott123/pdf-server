const puppeteer = require('/usr/src/app/node_modules/puppeteer')

/** @type import("puppeteer").Browser */
let browser

let timer

function resetTimer() {
  clearTimeout(timer)
  setTimeout(() => {
    browser && browser.close()
    browser = null
  }, 15000)
}

async function getBrowser() {
  resetTimer()

  if (browser) {
    return browser
  }

  browser = await puppeteer.launch({
    bindAddress: '127.0.0.1',
    args: [
      '--headless',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--remote-debugging-port=9222',
      '--remote-debugging-address=127.0.0.1',
      '--no-sandbox'
    ]
  })

  return browser
}

module.exports = async function (html) {
  const browser = await getBrowser()

  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle2' })

  const buffer = await page.pdf({
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: true,
    margin: {
      top: '10mm',
      left: '10mm',
      right: '10mm',
      bottom: '10mm'
    }
  })

  await page.close()

  return buffer
}
