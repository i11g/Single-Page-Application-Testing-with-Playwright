const baseUrl='http://localhost:3030';

let user={
    email:"",
    password:"123456"
} 

let book= {
    title:"",
    description:"",
    imageUrl:"/images/background.png",
    type:"Other"
}

let token="";
let userid="";

let lastCreatedBookId="";

let random=Math.floor(Math.random()*1000) 

QUnit.config.reorder=false;

QUnit.module("user functionalities", ()=>{
    QUnit.test("register testing", async(assert)=>{
        //arrange 
        let path='/users/register'
        let random=Math.floor(Math.random()*1000)
        let randomEmail=`abv${random}@abv.bg`
       
        user.email=randomEmail;

        //act 
        let response=await fetch(baseUrl + path, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        });

        let json=await response.json()

        console.log(json)

        assert.ok(response.ok, "response is successful") 

        assert.ok(json.hasOwnProperty('email'), "email exists");
        assert.equal(json['email'], user.email,"expected email");
        assert.strictEqual(typeof json.email,'string',"Property email is a string");

        assert.ok(json.hasOwnProperty('password'), "password exists");
        assert.equal(json['password'], user.password,"expected password");
        assert.strictEqual(typeof json.password,'string',"Property password is a string");
    })
    QUnit.test("register testing", async(assert)=>{
        //arrange 
        let path='/users/login'
              
        
        //act 
        let response=await fetch(baseUrl + path, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        });

        let json=await response.json()

        console.log(json)
        assert.ok(response.ok, "response is successful") 

        assert.ok(json.hasOwnProperty('email'), "email exists");
        assert.equal(json['email'], user.email,"expected email");
        assert.strictEqual(typeof json.email,'string',"Property email is a string");

        assert.ok(json.hasOwnProperty('password'), "password exists");
        assert.equal(json['password'], user.password,"expected password");
        assert.strictEqual(typeof json.password,'string',"Property password is a string"); 

        userid=json['_id']
        token=json['accessToken']
        sessionStorage.setItem('book-user', JSON.stringify(user))
    })
})
QUnit.module("book functionality", ()=>{
    QUnit.test("get all book testing", async(assert)=>{
        //assert
        let path='/data/books'
        let param="?sortBy=_createdOn%20desc"

        //act
        let response=await fetch(baseUrl+path+param)

        let json=await response.json()

        assert.ok(Array.isArray(json),"response is array") 
        console.log(json) 

        json.forEach(jsonData=>{
              assert.ok(jsonData.hasOwnProperty('description'), "Property description exists")
              assert.strictEqual(typeof jsonData.description,"string", "Property description is a sstring")

              assert.ok(jsonData.hasOwnProperty('imageUrl'), "Property imageUrl exists")
              assert.strictEqual(typeof jsonData.imageUrl,"string", "Property imageUrl is a sstring")
        })
    })
    QUnit.test("create book testing", async (assert)=>{
           //assert
           let path="/data/books";

           
           book.title=`Random_title${random}`
           book.description=`Random_description${random}`

           //act

           let response=await fetch(baseUrl+path, {
              method:"POST",
              headers: {
                'content-type':'application/json',
                'X-Authorization':token
              },
              body:JSON.stringify(book)
           })

           let json=await response.json()
           console.log(json) 

           assert.ok(response.ok, 'response is successful') 

           assert.ok(json.hasOwnProperty('description'), "Property description exists")
           assert.strictEqual(typeof json.description,"string", "Property description is a sstring")

           assert.ok(json.hasOwnProperty('imageUrl'), "Property imageUrl exists")
           assert.strictEqual(typeof json.imageUrl,"string", "Property imageUrl is a sstring") 
           
           lastCreatedBookId=json['_id']
    })
    QUnit.test("edit book testing", async (assert)=> {
        //assert
        let path="/data/books/"
        book.title=`Random_edited_title${random}`

        //act

        let response=await fetch(baseUrl+path+ `/${lastCreatedBookId}`, {
            method:"PUT",
            headers: {
              'content-type':'application/json',
              'X-Authorization':token
            },
            body:JSON.stringify(book)
        })

        let json=await response.json()
        
        console.log(json) 

        assert.ok(response.ok, 'response is successful') 

        assert.ok(json.hasOwnProperty('description'), "Property description exists")
        assert.strictEqual(typeof json.description,"string", "Property description is a sstring")

        assert.ok(json.hasOwnProperty('imageUrl'), "Property imageUrl exists")
        assert.strictEqual(typeof json.imageUrl,"string", "Property imageUrl is a sstring") 
        
        lastCreatedBookId=json['_id']

    })
    QUnit.test("delete book functionality", async(assert)=>{
        //assert
        let path="/data/books" 

        //act
        let response=await fetch(baseUrl+path+`/${lastCreatedBookId}`, {
              method:"DELETE",
              headers: {
                 'X-Authorization':token
              }
        })

        assert.ok(response.ok, "response is successful" )
    })
})
