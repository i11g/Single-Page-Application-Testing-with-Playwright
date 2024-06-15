import {test, expect} from '@playwright/test'
import { NAVBAR } from '../utils/locators'; 
import { BASE_URL, USER_DETAILS } from '../utils/constants';
import { TEST_URL } from '../utils/constants';
import { LOGINFORM } from '../utils/locators';
import { LOGGED_F0RM } from '../utils/locators';

//Navigation
test('Verify "All books" link is visible', async({page})=> {
    
    await page.goto('http://localhost:3000')
    
    await page.waitForSelector('nav.navbar')
    const allBookLink=await page.$('a[href="/catalog"]');
    const isLinkVisible= await allBookLink.isVisible(); 
    expect(isLinkVisible).toBe(true);
}) 

test('verify "All Books link is visible - test 2', async ({page})=>{
    await page.goto(BASE_URL); 

    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();    
}) 

test('verify "Login button is visible', async ({page})=> {

    await page.goto(BASE_URL)
    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();

})
test ('verify that "Register" button is visible', async ({page})=> { 

    await page.goto(BASE_URL)
    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
}) 

test ('verify "All books" is visible after user login', async ({page})=> {
     
    await page.goto(BASE_URL)
    
    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible()
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible()
    await page.locator(NAVBAR.LOGIN_BUTTON).click() 
    await expect (page.locator(LOGINFORM.LOGIN_FORM)).toBeVisible()
    await page.locator(LOGINFORM.LOGIN_EMAIL).fill(USER_DETAILS.USER_EMAIL)
    await page.locator(LOGINFORM.LOGIN_PASSWORD).fill(USER_DETAILS.USER_PASSWORD)
    await page.locator(LOGINFORM.LOGIN_BUTTON).click() 

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
}) 

//User Login elements
test ('verify "Welcome message" is visible after user login', async({page})=>{
      
      await page.goto(TEST_URL.TEST_LOGIN_URL) 
      await page.locator(LOGINFORM.LOGIN_EMAIL).fill(USER_DETAILS.USER_EMAIL)
      await page.locator(LOGINFORM.LOGIN_PASSWORD).fill(USER_DETAILS.USER_PASSWORD)
     await page.locator(LOGINFORM.LOGIN_BUTTON).click() 

      await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
      expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)

      await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
      await expect(page.locator(LOGGED_F0RM.WELCOME_MESSAGE)).toBeVisible();
}) 

test ('verify "My books button" is visible after user login', async ({page})=> {
    await page.goto(TEST_URL.TEST_LOGIN_URL) 
      await page.locator(LOGINFORM.LOGIN_EMAIL).fill(USER_DETAILS.USER_EMAIL)
      await page.locator(LOGINFORM.LOGIN_PASSWORD).fill(USER_DETAILS.USER_PASSWORD)
     await page.locator(LOGINFORM.LOGIN_BUTTON).click() 
    await expect(page.locator(LOGGED_F0RM.MY_BOOKS_BUTTON)).toBeVisible()
}) 

test ('verify "Add Book button" is visible', async({page})=> {
    await page.goto(TEST_URL.TEST_LOGIN_URL) 
      await page.locator(LOGINFORM.LOGIN_EMAIL).fill(USER_DETAILS.USER_EMAIL)
      await page.locator(LOGINFORM.LOGIN_PASSWORD).fill(USER_DETAILS.USER_PASSWORD)
     await page.locator(LOGINFORM.LOGIN_BUTTON).click() 
    await expect(page.locator(LOGGED_F0RM.ADD_BOOK_BUTTON)).toBeVisible();
})
test ('verify "Logout button" is visible', async({page})=> {
    await page.goto(TEST_URL.TEST_LOGIN_URL) 
    await page.locator(LOGINFORM.LOGIN_EMAIL).fill(USER_DETAILS.USER_EMAIL)
    await page.locator(LOGINFORM.LOGIN_PASSWORD).fill(USER_DETAILS.USER_PASSWORD)
   await page.locator(LOGINFORM.LOGIN_BUTTON).click() 
    await expect(page.locator(LOGGED_F0RM.LOGOUT_BUTTON)).toBeVisible();
})

//User Login  
test ('User Login wiht valid credentials', async({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL) 

    await expect(page.locator(LOGINFORM.LOGIN_FORM)).toBeVisible;
    await (page.locator(LOGINFORM.LOGIN_EMAIL).fill(USER_DETAILS.USER_EMAIL))
    await (page.locator(LOGINFORM.LOGIN_PASSWORD)).fill(USER_DETAILS.USER_PASSWORD)

    await (page.locator(LOGINFORM.LOGIN_BUTTON)).click()

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    await expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL)
    
})