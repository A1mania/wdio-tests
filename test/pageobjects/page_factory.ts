import { LoginPage } from '../pageobjects/login_page';
import { InventoryPage } from '../pageobjects/inventory_page';
import { Layout } from '../pageobjects/layout'

class SwagLabs {
    readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;
    readonly layout: Layout;


constructor() {
    this.loginPage = new LoginPage();
    this.inventoryPage = new InventoryPage();
    this.layout = new Layout();
}
}

export const swagLabs = new SwagLabs();