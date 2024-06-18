import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../../../utility/pagefixture";
import { expect } from "@playwright/test";
import HomePage from "../pages/home.page";
import ManagerPage from "../pages/manager.page";
import { delay } from "lodash";

setDefaultTimeout(50000);

let homepage = new HomePage();
let managerpage = new ManagerPage();


When('I click on Manager Login', async function () {
    await homepage.managerLogin().click();


});

Then('I should be able to see the manager page with add and manage customer', async function () {
    expect(await managerpage.openAccount().isVisible());
    expect(await managerpage.customers().isVisible());
    pageFixture.page.waitForTimeout(2000)
    expect(await managerpage.addCustomer().isVisible());
    await managerpage.addCustomer().click()
    await managerpage.firstName().fill('Playwright')
    await managerpage.lastName().fill('Typescript')
    await managerpage.postCode().fill('MK9 2FH')
    await managerpage.addNewCustomer().click()
    await managerpage.firstName().fill('Playwright')
    await managerpage.addNewCustomer().click()
    await pageFixture.page.waitForTimeout(5000)

});






