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

let lastCreatedEventId=" ";

let random = Math.floor(Math.random() * 10000);

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
        let randomTitle="Random title:"+random;
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

        assert.ok(json.hasOwnProperty('author'), "Author exists")
        assert.equal(json.author, myEvent.author, "author is expected")
        assert.strictEqual(typeof json.author,'string', "author is from expected type")
        
        assert.ok(json.hasOwnProperty('date'), "date exists")
        assert.equal(json.date, myEvent.date, "date is expected")
        assert.strictEqual(typeof json.date,'string', "date is from expected type")

        assert.ok(json.hasOwnProperty('title'), "title exists")
        assert.equal(json.title, myEvent.title, "title is expected")
        assert.strictEqual(typeof json.title,'string', "title is from expected type") 

        assert.ok(json.hasOwnProperty('description'), "description exists")
        assert.equal(json.description, myEvent.description, "description is expected")
        assert.strictEqual(typeof json.description,'string', "description is from expected type")

        assert.ok(json.hasOwnProperty('imageUrl'), "imageUrl exists")
        assert.equal(json.imageUrl, myEvent.imageUrl, "imageUrl is expected")
        assert.strictEqual(typeof json.imageUrl,'string', "imageUrl is from expected type")

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists")
        assert.strictEqual(typeof json._createdOn,'number', "_createdOn is from expected type")

        assert.ok(json.hasOwnProperty('_id'), "_id exists")
        assert.strictEqual(typeof json._id,'string', "_id is from expected type")

        assert.ok(json.hasOwnProperty('_ownerId'), "_ownerId exists")
        assert.strictEqual(typeof json._ownerId,'string', "_ownerId is from expected type") 
        
        lastCreatedEventId=json._id

    })
    QUnit.test("edit event testing", async (assert)=>{
        //arrange 
        let path ="/data/theaters/";

        let editedTitle="EditedTitle:" +random 
        myEvent.title=editedTitle; 

        //act 
        let response = await fetch(baseURL+path+`/${lastCreatedEventId}`, {
             method:"PUT",
             headers:{
                'content-type':'application/json',
                'X-Authorization':token
             },
             body: JSON.stringify(myEvent)
        }) 

        let json=await response.json(); 

        console.log(json) 

        assert.ok(response.ok, "response is ok")
       
        assert.ok(json.hasOwnProperty('author'), "Author exists")
        assert.equal(json.author, myEvent.author, "author is expected")
        assert.strictEqual(typeof json.author,'string', "author is from expected type")
        
        assert.ok(json.hasOwnProperty('date'), "date exists")
        assert.equal(json.date, myEvent.date, "date is expected")
        assert.strictEqual(typeof json.date,'string', "date is from expected type")

        assert.ok(json.hasOwnProperty('title'), "title exists")
        assert.equal(json.title, myEvent.title, "title is expected")
        assert.strictEqual(typeof json.title,'string', "title is from expected type") 

        assert.ok(json.hasOwnProperty('description'), "description exists")
        assert.equal(json.description, myEvent.description, "description is expected")
        assert.strictEqual(typeof json.description,'string', "description is from expected type")

        assert.ok(json.hasOwnProperty('imageUrl'), "imageUrl exists")
        assert.equal(json.imageUrl, myEvent.imageUrl, "imageUrl is expected")
        assert.strictEqual(typeof json.imageUrl,'string', "imageUrl is from expected type")

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists")
        assert.strictEqual(typeof json._createdOn,'number', "_createdOn is from expected type")

        assert.ok(json.hasOwnProperty('_id'), "_id exists")
        assert.strictEqual(typeof json._id,'string', "_id is from expected type")

        assert.ok(json.hasOwnProperty('_ownerId'), "_ownerId exists")
        assert.strictEqual(typeof json._ownerId,'string', "_ownerId is from expected type") 

        assert.ok(json.hasOwnProperty('_updatedOn'), "_updatedOn exists")
        assert.strictEqual(typeof json._updatedOn,'number', "_updatedOn is from expected type") 
        
        lastCreatedEventId=json._id

    })
    QUnit.test("delete event testing", async (assert)=>{
        //arrange
        let path="/data/theaters/"

        //act 

        let response = await fetch(baseURL+path+`/${lastCreatedEventId}`, {
            method:"DELETE",
            headers:{
                'X-Authorization':token
            }
        }) 

        //assert
        assert.ok(response.ok,"response is ok")
    })
      
})