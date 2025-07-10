
console.log('hello login')
let users = [];
let currentUser = [];

window.addEventListener('DOMContentLoaded', () => {
    users = JSON.parse(localStorage.getItem('users') ?? "[]");

    
    // functionality to automatically retrieve current user and login.
    // currentUser = JSON.parse(localStorage.getItem('currentUser') ?? "[]");
    // if(currentUser) {
    //     console.log('without entering - redirected to profile section')
    //     console.log('Retrieved data of current user automatically', currentUser);
    //     window.location.href = './../shoppingCartProject/profile/index.html';
    // }
})

let email = document.getElementById('email')
let password = document.getElementById('password')

function generateToken() {
    return Math.random(0, 100000).toString();
}

document.getElementById('login').addEventListener('click', () => {

    if(email === "" || password === "") {
        // If user doesn't enter all the details
        console.log("Please enter all the details")
    } else {
        // Entered all the details
        console.log('Entered details', email.value, password.value);
        // Now check whether email and password are inside local storage
        let userDetails = users.filter((user) => user.email === email.value);
        if(userDetails.length > 0) {
            let matchedUser = userDetails[0];
            // If email found, check whether password entered is correct 
            console.log('User details found inside local', matchedUser);
            if(password.value === matchedUser.password) {
                console.log('Password matches! Welcome Top G')
                // redirect to profile page
                // clear the inputs
                // create a currentUser and store it's email and ID in localstorage
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email.value,
                    password: password.value,
                    token: generateToken()
                }))
                document.getElementById('email').value = ''
                document.getElementById('password').value = ''
                // window.location.href('/profile');
                console.log('redirected to profile section')
                window.location.href = './../shoppingCartProject/profile/index.html';
            } else {
                console.log('Incorrect Password, Please try again !')
            }
        } else {
            console.log('User not found, please sign up');
        }
    }

})