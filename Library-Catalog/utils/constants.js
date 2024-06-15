const BASE_URL = 'http://localhost:3000' 

const TEST_URL={
    TEST_HOME_URL: BASE_URL + '/',
    TEST_LOGIN_URL: BASE_URL +'/login',
    TEST_REGISTER_URL: BASE_URL +'/register',
    TEST_CATALOG_URL: BASE_URL+'/catalog'
} 

const USER_DETAILS= {
    USER_EMAIL: 'peter@abv.bg',
    USER_PASSWORD: '123456'
}

export {
    BASE_URL,
    TEST_URL,
    USER_DETAILS
}