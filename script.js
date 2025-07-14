let signUp = document.getElementById('signUp');

signUp.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(signUp);
    let firstName = formData.get('fname');
    let lastName = formData.get('lname');
    let email = formData.get('email')
    let password = formData.get('password')
    let confirm = formData.get('confirmPassword')


    if(firstName === "" || lastName ==="" || email === "" || password === "" || confirm === "") {
        // not entered all the details
        document.getElementById('errormessage').innerHTML = `<p style="color: red"> Please Enter all the details. </p>`
        setTimeout(() => {
            document.getElementById('errormessage').innerHTML = '';
        }, 4000);
    } else {
        // all the details entered but password and confirm password not equal
        if(password !== confirm) {
            document.getElementById('errormessage').innerHTML = `<p style="color: red"> Password and Confirm Password are not same! </p>`
        setTimeout(() => {
            document.getElementById('errormessage').innerHTML = '';
        }, 4000);
        } else {
            // All correct details entered
            let users = JSON.parse(localStorage.getItem('users') ?? "[]");
            let filteredUser = users.filter((user) => user.email === email);
            if(filteredUser.length > 0) {
                document.getElementById('errormessage').innerHTML = `<p style="color: red"> User Already Exists! Please Login. </p>`
        setTimeout(() => {
            document.getElementById('errormessage').innerHTML = '';
        }, 4000);
            }
            else {
                users.push({
                    email: email,
                    password: password,
                    fname : firstName,
                    lname: lastName,
                    createdAt: new Date()
                })
                localStorage.setItem("users", JSON.stringify(users));
                window.location.href = './login.html';

            }
            
            document.getElementById('fname').value = ''
            document.getElementById('lname').value = ''
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
            document.getElementById('confirmPassword').value = ''

        }
    }
})




