const baseUrl='http://localhost:3030';

let user={
    email:"",
    password:"123456"
} 

let token="";
let userid="";

let lastCreatedBookId="";



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
    
})
