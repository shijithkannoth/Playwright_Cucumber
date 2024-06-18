import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../../../utility/pagefixture";
import { expect } from "@playwright/test";
import HomePage from "../pages/home.page";

setDefaultTimeout(50000);

let homepage = new HomePage()

Given('I navigate to the banking page', async function () {
    await pageFixture.page.goto(process.env.URI!)

}); 