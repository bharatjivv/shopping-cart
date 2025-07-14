let currentUser = null;
window.addEventListener('DOMContentLoaded', ()=> {
    let users = JSON.parse(localStorage.getItem('users'));
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || users.length === 0) {
        window.location.href = "../login.html";
        return;
    }

    let selectedUserIndex = users.findIndex(
        usr => currentUser.email === usr.email
    );

    if (selectedUserIndex === -1) {
        localStorage.removeItem('currentUser');
        window.location.href = "../login.html";
        return;
    }

    renderProfilePage(users, currentUser, selectedUserIndex);
    
})



function renderProfilePage(users, currentUser, selectedUserIndex) {

    let editedNameValue = document.getElementById('editedNameValue');
    editedNameValue.addEventListener('click', () => {

        let efname = document.getElementById('fname').value;
        let elname = document.getElementById('lname').value;

        if(efname === "" || elname === "") {
            document.getElementById('message').innerHTML = `<p style="color: red"> Please enter all the details</p>`
            setTimeout(() => {
                document.getElementById('message').innerHTML = '';
            }, 4000);
        } else {
            // changing fname and lname
            users[selectedUserIndex].fname = efname;
            users[selectedUserIndex].lname = elname;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            document.getElementById('fname').value = ''
            document.getElementById('lname').value = ''

            document.getElementById('message').innerHTML = `<p style="color: green">Name Updated !</p>`
            setTimeout(() => {
                document.getElementById('message').innerHTML = '';
            }, 4000);

        }

    })


    let editedPassword = document.getElementById('editPassword');
    editedPassword.addEventListener('click', () => {
        let oldPassword = document.getElementById('oldPassword').value;
        let newPassword = document.getElementById('newPassword').value;
        let confirmPassword = document.getElementById('confirmPassword').value;

        if(oldPassword === "" || newPassword === "" || confirmPassword === "") {
            document.getElementById('message').innerHTML = `<p style="color: red"> Please enter all the details</p>`
            setTimeout(() => {
                document.getElementById('message').innerHTML = '';
            }, 4000);
        } else {
            // check if old password is correct.
            if(oldPassword !== users[selectedUserIndex].password) {
                
                document.getElementById('message').innerHTML = `<p style="color: red"> Your old password is not correct! Please re-enter password</p>`
            setTimeout(() => {
                document.getElementById('message').innerHTML = '';
            }, 4000);
            } else {
                if(newPassword !== confirmPassword) {
                     document.getElementById('message').innerHTML = `<p style="color: red"> New Password and confirm Password not equal! Please re-enter.</p>`
            setTimeout(() => {
                document.getElementById('message').innerHTML = '';
            }, 4000);
                } else {
                    document.getElementById('message').innerHTML = `<p style="color: green"> Passwords Updated Successfully !</p>`
            setTimeout(() => {
                document.getElementById('message').innerHTML = '';
            }, 4000);
                    users[selectedUserIndex].password = newPassword;
                    currentUser.password = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    document.getElementById('oldPassword').value = '';
                    document.getElementById('newPassword').value = '';
                    document.getElementById('confirmPassword').value = '';

                }

            }
        }

    })

}

document.getElementById('logoutbtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    currentUser = null;
    location.reload();
    window.location.href = "./../login.html";
})

