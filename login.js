let users = [];
let currentUser = [];

window.addEventListener('DOMContentLoaded', () => {
    users = JSON.parse(localStorage.getItem('users') ?? "[]");

})



function generateToken() {
    return Math.random(0, 100000).toString();
}

document.getElementById('login').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    if(email === "" || password === "") {
        // If user doesn't enter all the details
        document.getElementById('errormessage').innerHTML = `<p style="color: red"> Please Enter All the Details. </p>`
        setTimeout(() => {
            document.getElementById('errormessage').innerHTML = '';
        }, 4000);

    } 
    
    else {
        // Entered all the details
        // Now check whether email and password are inside local storage
        let userDetails = users.filter((user) => user.email === email);
        if(userDetails.length > 0) {
            let matchedUser = userDetails[0];
            // If email found, check whether password entered is correct 
            if(password === matchedUser.password) {
                // redirect to profile page
                // clear the inputs
                // create a currentUser and store it's email and ID in localstorage
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    password: password,
                    token: generateToken()
                }))
                document.getElementById('email').value = ''
                document.getElementById('password').value = ''
                window.location.href = './profile/index.html';
            } else {
                document.getElementById('errormessage').innerHTML = `<p style="color: red"> Incorrect Password, Please try again !</p>`
        setTimeout(() => {
            document.getElementById('errormessage').innerHTML = '';
        }, 4000);
            }
        } 
        else {
           document.getElementById('errormessage').innerHTML = `<p style="color: red"> Incorrect Email or Password </p>`
        setTimeout(() => {
            document.getElementById('errormessage').innerHTML = '';
        }, 4000);
        }
    }

})

