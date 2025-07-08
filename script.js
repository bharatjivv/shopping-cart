console.log('hi')

// let submitbtn = document.getElementById('submitbtn');

// submitbtn.addEventListener('click', (e) => {
//     let fname = document.getElementById('name').value;
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     let confirmPassword= document.getElementById('confirmPassword').value;

//     e.preventDefault();
//     console.log('clicked submit btn')

//     if(fname === "" || email === "" || password === "" || confirmPassword === "") {
//         // All the details were not entered by the user
//         console.log("Please enter all the details")
//     } else {
//         // All details entered but password and confirm password aren't equal
//         if(password !== confirmPassword) {
//             console.log('Passwords Donot match! Please re-enter the details');
//         } else {
//             // All the details added and both passwords match
//             console.log('signUp successful!')
            
//             document.getElementById('name').value = "";
//             document.getElementById('email').value = "";
//             document.getElementById('password').value = "";
//             document.getElementById('confirmPassword').value = "";
//         }
//     }

    
// })




let signUp = document.getElementById('signUp');


signUp.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(signUp);
    let fullName = formData.get('name');
    let email = formData.get('email')
    let password = formData.get('password')
    let confirm = formData.get('confirmPassword')


    if(fullName === "" || email === "" || password === "" || confirm === "") {
        // not entered all the details
        console.log('Please enter all the details')
    } else {
        // all the details entered but password and confirm password not equal
        if(password !== confirm) {
            console.log("You've not entered both passwords same. ")
        } else {
            // All correct -submit the form enter the details and empty the fields
            // This is the case where all the details are entered and correct
            // What to do next?


            
            console.log(fullName, email, password, confirm);
            document.getElementById('name').value = ''
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
            document.getElementById('confirmPassword').value = ''

        }
    }
})