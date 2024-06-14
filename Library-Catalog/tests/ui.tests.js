import {test, expect} from '@playwright/test'
import { NAVBAR } from '../utils/locators'; 

//Navigation
test('Verify "All books" link is visible', async({page})=> {
    
    await page.goto('http://localhost:3000/catalog')
    
    await page.waitForSelector(nav.navbar)
    const allBookLink=await page.$('a[href="/catalog');
    const isLinkVisible= await allBookLink.isVisible(); 
    expect(isLinkVisible).toBe(true);
})