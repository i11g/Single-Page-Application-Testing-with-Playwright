const baseURL="http://localhost:3030";

let user = {
    email: "",
    password: "123456"
} 

let myEvent = {
    author: "Random Author", 
    date: "24.06.2024", 
    title: "", 
    description: "", 
    imageUrl: "/images/Pretty-Woman.jpg" 
}

QUnit.config.reorder = false; 

let token=""
let userId="" 

QUnit.module("user functionalities", () => {
    QUnit.test("registration", async (assert) => {
        //arrange
        let path = '/users/register';

        let random = Math.floor(Math.random() * 10000);
        let email = `abv${random}@abv.bg`;
        user.email = email;

        //act
        let response = await fetch(baseURL + path, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        let json = await response.json();
        
        console.log(json)

        //assert
        assert.ok(response.ok); 

        assert.ok(json.hasOwnProperty('email'), "email exists");
        assert.equal(json['email'], user.email, "expected email")
        assert.strictEqual(typeof json.email, 'string', 'email has correct type')

        assert.ok(json.hasOwnProperty('password'), "password exists");
        assert.equal(json['password'], user.password, "expected password")
        assert.strictEqual(typeof json.password, 'string', 'password has correct type')

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists");
        assert.strictEqual(typeof json._createdOn, 'number', '_createdOn has correct type')

        assert.ok(json.hasOwnProperty('_id'), "_id exists");
        assert.strictEqual(typeof json._id, 'string', '_id has correct type')

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exists");
        assert.strictEqual(typeof json.accessToken, 'string', 'accessToken has correct type') 

        token= json['accessToken']
        userId= json['_id']
        sessionStorage.setItem('event-user', JSON.stringify(user));

    })
    QUnit.test("login testing", async (assert) => {
        //arrange 

        let path= "/users/login"; 

        //act 

        let response=await fetch(baseURL+path, {
           
            method: "POST",
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(user)   
         }) 

        let json = await response.json() 
        console.log(json) 

        assert.ok(response.ok) 

        assert.ok(json.hasOwnProperty('email'), "email exists");
        assert.equal(json['email'], user.email, "expected email")
        assert.strictEqual(typeof json.email, 'string', 'email has correct type')

        assert.ok(json.hasOwnProperty('password'), "password exists");
        assert.equal(json['password'], user.password, "expected password")
        assert.strictEqual(typeof json.password, 'string', 'password has correct type')

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists");
        assert.strictEqual(typeof json._createdOn, 'number', '_createdOn has correct type')

        assert.ok(json.hasOwnProperty('_id'), "_id exists");
        assert.strictEqual(typeof json._id, 'string', '_id has correct type')

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exists");
        assert.strictEqual(typeof json.accessToken, 'string', 'accessToken has correct type') 

        token= json['accessToken']
        userId= json['_id']
        sessionStorage.setItem('event-user', JSON.stringify(user));





    })
})

QUnit.module("Evant functionalities", ()=>{
    QUnit.test("get all events testing", async(assert)=>{
        //arrange
       let path="/data/theaters";
       let queryParams="?sortBy=_createdOn%20desc&distinct=title";

       //act 
       let response=await fetch(baseURL+path+queryParams);

       let json=await response.json(); 

       //assert
       assert.ok(response.ok, "Response is OK");
       assert.ok(Array.isArray(json), "response is array"); 
       
       console.log(json)
        
       json.forEach(data=>{
           
        assert.ok(data.hasOwnProperty('author'),"author is OK")
        assert.strictEqual(typeof data.author,'string', "author is from correct type") 

        assert.ok(data.hasOwnProperty('date'),"date is OK")
        assert.strictEqual(typeof data.date,'string', "date is from correct type")

        assert.ok(data.hasOwnProperty('description'),"description is OK")
        assert.strictEqual(typeof data.description,'string', "description is from correct type") 

        assert.ok(data.hasOwnProperty('imageUrl'),"imageUrl is OK")
        assert.strictEqual(typeof data.imageUrl,'string', "imageUrl is from correct type")

        assert.ok(data.hasOwnProperty('title'),"title is OK")
        assert.strictEqual(typeof data.title,'string', "title is from correct type") 

        assert.ok(data.hasOwnProperty('_createdOn'),"_createdOn is OK")
        assert.strictEqual(typeof data._createdOn,'number', "_createdOn is from correct type") 

        assert.ok(data.hasOwnProperty('_id'),"_id is OK")
        assert.strictEqual(typeof data._id,'string', "_id is from correct type") 

        assert.ok(data.hasOwnProperty('_ownerId'),"_onerId is OK")
        assert.strictEqual(typeof data._ownerId,'string', "_ownerId is from correct type") 

       })

    })
    QUnit.test("create event testing", async(assert)=>{
        //arrange
        let path="/data/theaters";
        let random = Math.floor(Math.random() * 10000);
        let randomTitle="Random title"+random;
        myEvent.title=randomTitle;
        let randomDescription="Random_description:"+random
        myEvent.description=randomDescription; 

        //act

        let response=await fetch(baseURL+path, {
             method:"POST",
             headers:{
                'content-type':'application/json',
                'X-Authorization':token
             },
             body: JSON.stringify(myEvent)
        }) 

        let json=await response.json();

        console.log(json)

        assert.ok(response.ok,"response is ok")

    })
      
})