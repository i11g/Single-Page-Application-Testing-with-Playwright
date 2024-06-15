const NAVBAR= {
    NAV_NAVBAR:'nav.navbar',
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGIN_BUTTON: 'a[href="/login"]',
    REGISTER_BUTTON: 'a[href="/register"]'
}

const LOGINFORM ={
    LOGIN_FORM:'#login-form',
    LOGIN_EMAIL: '#login-form input[id=email]',
    LOGIN_PASSWORD: '#login-form input[id=password]',
    LOGIN_BUTTON: '#login-form input[type=submit]'
}

const LOGGED_F0RM={
    WELCOME_MESSAGE:'//span[text()="Welcome, peter@abv.bg"]',
    MY_BOOKS_BUTTON:'a[href="/profile"]',
    ADD_BOOK_BUTTON: 'a[href="/create"]',
    LOGOUT_BUTTON:'a[href="javascript:void(0)"]'
} 

const BOOKADITION ={
    ADD_MEW_BOOK_FORM:'#create-form',
    BOOK_TITLE:'input[id="title"]',
    BOOK_DESCRIPTION:'textarea[id="description"]',
    BOOK_IMAGE:'input[id="image"]',
    BOOK_OPTIONS:'#type',
    ADD_NEW_BOOK_BUTTON: '#create-form input[type="submit"]'
}

export {
    NAVBAR,
    LOGINFORM,
    LOGGED_F0RM,
    BOOKADITION
}