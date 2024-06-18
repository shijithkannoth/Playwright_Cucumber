import { pageFixture } from "../../../utility/pagefixture";


export default class HomePage {

    public customerLogin() {
        return pageFixture.page.getByText("Customer Login");
    }

    public managerLogin() {
        return pageFixture.page.getByText("Bank Manager Login");
    }

    public homeMenu() {
        return pageFixture.page.getByTestId("btn home");
    }


}