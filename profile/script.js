console.log('hi from profile page')
let currentUser = null;
window.addEventListener('DOMContentLoaded', ()=> {
    let users = JSON.parse(localStorage.getItem('users'));
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let selectedUserIndex = users.findIndex((usr) => {return currentUser.email === usr.email})


    if(currentUser) {
        renderProfilePage(users, currentUser, selectedUserIndex);
    } else {
         // redirect them to login page
        window.location.href = "./../../shoppingCartProject/login.html";
    }
})


function renderProfilePage(users, currentUser, selectedUserIndex) {
    // displayed the current user on the screen
    // let info = document.createElement('div')
    // let para = document.createElement('p')
    // para.innerHTML = `
    //             Fname is - ${users[selectedUserIndex].fname}
    //             <br />
    //             Email is - ${users[selectedUserIndex].email} 
    //             <br />
    //             Password is - ${users[selectedUserIndex].password}
    //             <br />
    //             Lname is - ${users[selectedUserIndex].lname}
    //             `
    // info.appendChild(para);
    // document.body.appendChild(info);

    let editedNameValue = document.getElementById('editedNameValue');
    editedNameValue.addEventListener('click', () => {

        let efname = document.getElementById('fname').value;
        let elname = document.getElementById('lname').value;

        if(efname === "" || elname === "") {
            console.log('Please enter all the details');
        } else {
            document.getElementById('fname').value = ''
            document.getElementById('lname').value = ''

            // changing fname and lname
            users[selectedUserIndex].fname = efname;
            users[selectedUserIndex].lname = elname;
            localStorage.setItem('users', JSON.stringify(users));
        }

    })


    let editedPassword = document.getElementById('editPassword');
    editedPassword.addEventListener('click', () => {
        let oldPassword = document.getElementById('oldPassword').value;
        let newPassword = document.getElementById('newPassword').value;
        let confirmPassword = document.getElementById('confirmPassword').value;

        if(oldPassword === "" || newPassword === "" || confirmPassword === "") {
            console.log('Please enter all the details');
        } else {
            // check if old password is correct.
            if(oldPassword !== users[selectedUserIndex].password) {
                // console.log(oldPassword, users[selectedUserIndex].password);
                console.log('Your old password is not correct! Please re-enter password');
            } else {
                console.log('Old password entered matches! Ab tujhe change karne dunga password')
                if(newPassword !== confirmPassword) {
                    console.log('New Password and confirm Password not equal!Please re-enter.');
                } else {
                    console.log('ab jab new password aur confirm password equal hai to update kar deta hoon tere passwords');
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


        // if(oldPassword === "" || newPassword === "" || confirmPassword === "" || (oldPassword !== users[selectedUserIndex].password) || (newPassword !== confirmPassword)) 
        // We can also converge all conditions under single if block

    })

}