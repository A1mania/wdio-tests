export class Layout {
  private menuButtonLocator = "#react-burger-menu-btn";
  private cartBadgeLocator = ".shopping_cart_badge";
  private logOutLinkLocator = "#logout_sidebar_link";

  get menuButton() {
    return $(this.menuButtonLocator);
  }

  get cartBadge() {
    return $(this.cartBadgeLocator);
  }

  get logOutLink() {
    return $(this.logOutLinkLocator);
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async openMenuIfClosed() {
    const menuWrap = await $(".bm-menu-wrap");
    const ariaHidden = await menuWrap.getAttribute("aria-hidden");

    if (ariaHidden === "true") {
      await this.openMenu();
    }
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.getText();
    return text ? Number(text) : 0;
  }
}



