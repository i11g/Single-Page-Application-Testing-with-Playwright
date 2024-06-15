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

const MESSAGE = {
    ALERT_MESSAGE:'All fileds are required'
} 

const ADD_BOOK ={
    TITLE: 'New book title',
    DESCRIPTION: 'New book description',
    IMAGE:'https://example.com/book-image.jpg',
    BOOK_OPTIONS:{
      FICTION:'Fiction',
      ROMANCE:'Romance',      
      MISTERY:'Mistery',
      CLASIC:'Clasic',
      OTHER:'Other'
    }
}

export {
    BASE_URL,
    TEST_URL,
    USER_DETAILS,
    MESSAGE,
    ADD_BOOK
    

}