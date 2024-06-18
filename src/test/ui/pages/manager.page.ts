import { pageFixture } from "../../../utility/pagefixture";

export default class ManagerPage {

    public addCustomer() {
        return pageFixture.page.getByText('Add Customer')
    }

    public openAccount() {
        return pageFixture.page.getByAltText('Add Customer')
    }

    public customers() {
        return pageFixture.page.getByText('Customers')
    }

    public firstName() {
        return pageFixture.page.getByPlaceholder('First Name')
    }

    public lastName() {
        return pageFixture.page.getByPlaceholder('Last Name')
    }

    public postCode() {
        return pageFixture.page.getByPlaceholder('Post Code')
    }

    public addNewCustomer() {
        return pageFixture.page.locator('//*[@class="btn btn-default"]')
    }

}