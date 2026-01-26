import { $, $$ } from '@wdio/globals';
import { Layout } from './layout';

export class InventoryPage extends Layout {

    private inventoryItemsLocator = '.inventory_item';
    private addToCartButtonsLocator = '.btn_inventory';
    private removeButtonsLocator = '.btn_inventory';
    private itemNamesLocator = '.inventory_item_name';
    private itemPricesLocator = '.inventory_item_price';
    private menuLocator = '.bm-menu';
    private menuWrapLocator = '.bm-menu-wrap'
    private firstItemLocator = '.inventory_list .inventory_item:first-child';
    private titleLocator = '.title'

    get title() {
        return $(this.titleLocator);
    }

    get inventoryItems() {
        return $$(this.inventoryItemsLocator);
    }

    get addToCartButtons() {
        return $$(this.addToCartButtonsLocator);
    }

    get removeButtons() {
        return $$(this.removeButtonsLocator);
    }

    get itemNames() {
        return $$(this.itemNamesLocator);
    }

    get itemPrices() {
        return $$(this.itemPricesLocator);
    }

    get menu() {
        return $(this.menuLocator);
    }

    get menuWrap() {
        return $(this.menuWrapLocator);
    }

    get firstItem() {
        return $(this.firstItemLocator);
    }

    async getInventoryItemCount(): Promise<number> {
        return this.inventoryItems.length;
    }

    async addToCartByIndex(index: number) {
        await this.addToCartButtons[index].click();
    }

    async removeFromCartByIndex(index: number) {
        await this.removeButtons[index].click();
    }

    async addToCartByName(itemName: string) {
        for (const item of this.inventoryItems) {
            const name = await item.$('.inventory_item_name').getText();
            if (name === itemName) {
                await item.$('.btn_inventory').click();
                break;
            }
        }
    }

    async getSortingOptions(): Promise<string[]> {
        const options =  $$('.product_sort_container option');
        return Promise.all(await options.map(opt => opt.getText())) as Promise<string[]>;
    }
}
