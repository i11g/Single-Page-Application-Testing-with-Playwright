const baseURL="http://localhost:3030/admin";

let user = {

    email: "",
    password:"123456"
} 

QUnit.config.reorder = false; 

let token=""
let userId="" 

QUnit.module("user functionalitty", ()=> {
    QUnit.test("registration", async(assert)=>{
      //assert
      let path="/users/register"

      let random=Math.floor(Math.random()*1000)
      user.email=`abv${random}@abv.bg` 
     //act
     let response = await fetch(baseURL + path, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });

      let jsonData=await response.json() 

     //assert 
     console.log(jsonData)
     assert.ok(response.ok)

    })
} )