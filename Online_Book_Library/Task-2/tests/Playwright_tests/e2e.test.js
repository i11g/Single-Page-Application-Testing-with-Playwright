const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    
    describe("authentication", () => {
        test("register makes corrct API call", async()=>{
            await page.goto(host)
            await page.click('text=Register')
            await page.waitForSelector('form') 

            let random=Math.floor(Math.random()*1000) 
            user.email=`abv${random}@abv.bg`

            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            await page.locator('#repeat-pass').fill(user.confirmPass) 

            let [response]=await Promise.all([
                page.waitForResponse(response=>response.url().includes("/users/register")&&response.status()==200),
                page.click('[type="submit"]')
            ])

            let userData=await response.json();

            expect(response.ok()).toBeTruthy()
            expect(userData.email).toBe(user.email)
            expect(userData.password).toBe(user.password)

        })
        test("login makes correct API calls", async()=>{
            await page.goto(host)
            await page.click('text=Login')
            await page.waitForSelector('form') 
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)

            let [response]=await Promise.all([
                page.waitForResponse(response=>response.url().includes("/users/login")&&response.status()==200),
                page.click('[type="submit"]')
            ])

            let userData=await response.json();

            expect(response.ok()).toBeTruthy()
            expect(userData.email).toBe(user.email)
            expect(userData.password).toBe(user.password)

        })
        test("logout makes correct API calls", async()=>{
            await page.goto(host)
            await page.click('text=Login')
            await page.waitForSelector('form') 
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            await page.click('[type="submit"]')

            let [response]=await Promise.all([
                page.waitForResponse(response=>response.url().includes("/users/logout")&&response.status()==204),
                page.locator('nav >> text=Logout').click()
            ])

            expect(response.ok).toBeTruthy()
            await page.waitForSelector('nav >> text=Login')
            expect(page.url()).toBe(host+"/")
        })
    })

    describe("navbar", () => {
        test("logged users shoul see correct navigation", async()=>{
            await page.goto(host) 
            
            await page.goto(host)
            await page.click('text=Login')
            await page.waitForSelector('form') 
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            await page.click('[type="submit"]')

            await expect(page.locator('nav>>text=Dashboard')).toBeVisible()
            await expect(page.locator('nav>>text=My Books')).toBeVisible()
            await expect(page.locator('nav>>text=Add Book')).toBeVisible()
            await expect(page.locator('nav>>text=Logout')).toBeVisible()
            await expect(page.locator('nav>>text=Login')).toBeHidden()
            await expect(page.locator('nav>>text=Register')).toBeHidden()
        })
        test("guest user should see correct navigation", async ()=>{
            await page.goto(host) 

            
            await expect(page.locator('nav>>text=Login')).toBeVisible()
            await expect(page.locator('nav>>text=Register')).toBeVisible()
            await expect(page.locator('nav>>text=Dashboard')).toBeVisible()
            await expect(page.locator('nav>>text=My Books')).toBeHidden()
            await expect(page.locator('nav>>text=Add Book')).toBeHidden()
            await expect(page.locator('nav>>text=Logout')).toBeHidden()
        })
        
    });

    describe("CRUD", () => {
        beforeEach (async()=>{
            await page.goto(host) 
            
            await page.goto(host)
            await page.click('text=Login')
            await page.waitForSelector('form') 
            await page.locator('#email').fill(user.email)
            await page.locator('#password').fill(user.password)
            await page.click('[type="submit"]')
        }) 
        test('create book makes correct API call', async()=>{
              await page.click('nav >> text=Add Book')
              await page.waitForSelector('form')

              await page.locator('#title').fill('random title')
              await page.locator('#description').fill('random description')
              await page.locator('#image').fill('/images/book.png')
              await page.locator('#type').selectOption('Romance') 

              let [response]=await Promise.all([
                page.waitForResponse(response=>response.url().includes("/data/books")&&response.status()==200),
                page.click('[type="submit"]')
            ])

            let bookData=await response.json();

            expect(response.ok()).toBeTruthy()
            expect(bookData.title).toEqual('random title')
            expect(bookData.description).toEqual('random description')
            expect(bookData.imageUrl).toEqual('/images/book.png')
            expect(bookData.type).toEqual('Romance')
        })
        test('edit book makes correct API call', async()=>{
            await page.click('text=My Books')

            await page.locator('text=Details').first().click()
            await page.locator('text=Edit').first().click()

            await page.waitForSelector('form') 

            await page.locator('#title').fill('Random_Edited_title')

            let [response]=await Promise.all([
                page.waitForResponse(response=>response.url().includes("/data/books")&&response.status()==200),
                page.click('[type="submit"]')
            ])

            let bookData=await response.json();

            expect(response.ok()).toBeTruthy()
            expect(bookData.title).toEqual('Random_Edited_title')
            expect(bookData.description).toEqual('random description')
            expect(bookData.imageUrl).toEqual('/images/book.png')
            expect(bookData.type).toEqual('Fiction')


        } )
        test("delete book makes correct API calls", async ()=>{
            await page.click('text=My Books')

            await page.locator('text=Details').first().click()
            let [response]=await Promise.all([
                page.waitForResponse(response=>response.url().includes("/data/books")&&response.status()==200),
                page.click('text=Delete')
            ])

            expect(response.ok()).toBeTruthy()
        })
    })
})