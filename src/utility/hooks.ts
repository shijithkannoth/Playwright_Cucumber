import { After, AfterAll, AfterStep, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pagefixture"
import { getapi_token } from "./common.api";
import { time } from "console";


let browser: Browser
let context: BrowserContext

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false })
    process.env.URI = 'https://www.way2automation.com/angularjs-protractor/banking/#/login'
    context = await browser.newContext()
    context.browser()
    const page = await context.newPage()
    pageFixture.page = page
    // page.setViewportSize({ width: 1512, height: 767 })
    page.goto(process.env.URI!)
    await page.waitForTimeout(4000)
})

// Before(async function () {
//     await pageFixture.page.goto('https://ops.dev.habitatenergy.online/');
//     await pageFixture.page.waitForTimeout(2000)
//     getapi_token()
// })

AfterStep(async function ({ pickle, result }) {

    if (result?.status == Status.FAILED) {
        let scenario_name = pickle.name
        const img = await pageFixture.page.screenshot({ path: './test-results/screenshot/' + scenario_name + '}.png', type: "png" })
        this.attach(img, "image/png")
    }

})

After(async function (pickle) {
    // Add Screenshot after each step

    // await pageFixture.page.close()
    // await context.close()
})

AfterAll(async function () {
    await browser.close()
})



