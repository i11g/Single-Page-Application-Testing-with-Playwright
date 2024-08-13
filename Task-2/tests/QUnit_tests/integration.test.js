const baseURL="http://localhost:3030/";

let user = {
    email: "",
    password: "123456"
} 

QUnit.config.reorder = false; 

let token=""
let userId="" 

QUnit.module("user functionalities", () => {
    QUnit.test("registration", async (assert) => {
        //arrange
        let path = 'users/register';

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

    })
})