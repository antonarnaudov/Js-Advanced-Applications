const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables

describe('E2E tests', function() {
    before(async() => {
        browser = await chromium.launch({ headless: false, slowMo: 500 });
        // browser = await chromium.launch();
    });
    after(async() => {
        await browser.close();
    });
    beforeEach(async() => {
        page = await browser.newPage();
    });
    afterEach(async() => {
        await page.close();
    });

    it('Loads static pages', async() => {
        await page.goto('http://127.0.0.1:5500/architecture-and-testing/accordion/index.html')
        const content = await page.content()

        expect(content).to.contains('Scalable Vector Graphics')
        expect(content).to.contains('Open standard')
        expect(content).to.contains('Unix')
        expect(content).to.contains('ALGOL')

        await page.screenshot({ path: 'index.png' })
    })
});