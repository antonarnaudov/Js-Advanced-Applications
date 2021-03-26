const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables

describe('E2E tests', function() {
    before(async() => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
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

    it('Loads static page', async() => {
        await page.goto('http://localhost:3000')
        const content = await page.content()

        expect(content).to.contains('Scalable Vector Graphics')
        expect(content).to.contains('Open standard')
        expect(content).to.contains('Unix')
        expect(content).to.contains('ALGOL')

        await page.screenshot({ path: 'index.png' })
    })

    it('Loads static page properly', async() => {
        await page.goto('http://localhost:3000')

        const titles = await page.$$eval('.accordion .head span', (spans) => {
            return spans.map(s => s.textContent);
        })

        expect(titles).includes('Scalable Vector Graphics')
        expect(titles).includes('Open standard')
        expect(titles).includes('Unix')
        expect(titles).includes('ALGOL')
    })

    it('Test first article', async() => {
        await page.goto('http://localhost:3000')
        const content = await page.textContent('.accordion .head span')

        expect(content).to.contains('Scalable Vector Graphics')
    });

    it('toggles content', async() => {
        await page.goto('http://localhost:3000')

        await page.click('#main > .accordion:first-child >> text=More')
        await page.waitForSelector('#main > .accordion:first-child >> .extra p')
        await page.click('#main > .accordion:first-child >> text=Less')

        const visible = await page.isVisible('#main > .accordion:first-child >> .extra p')
        expect(visible).to.be.false

    });
});