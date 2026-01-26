import { $ } from '@wdio/globals'
import { Layout } from './layout';


export class LoginPage extends Layout {

    protected url = 'https://www.saucedemo.com/'
   
    private usernameInputLocator = '[data-test="username"]';
    private passwordInputLocator = '[data-test="password"]';
    private loginButtonLocator = '[data-test="login-button"]';
    private errorMessageLocator = '[data-test="error"]';

    get title() {
        return browser.getTitle();
    }

    get usernameInput() {
        return $(this.usernameInputLocator);
    }

     get passwordInput() {
        return $(this.passwordInputLocator);
    }

    get loginButton() {
        return $(this.loginButtonLocator);
    }

    get errorMessage() {
        return $(this.errorMessageLocator);
    }

    async navigate () {       
         if (!this.url) throw new Error("URL is not difined for this page");

        await browser.navigateTo(this.url);
    }

    async clickLoginButton() {
      await this.loginButton.click();
      }

   async login(username: string, password: string) {
      await this.usernameInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.loginButton.click();
      }
}


