let loginValue = document.querySelector('.log');
let passwordValue = document.querySelector('.pas');
let emailValue = document.querySelector('.email');
let addButton = document.getElementById('add');
let editUserButton = document.getElementById('edit');
let tBody = document.getElementById('tbody');
let checkLogin = /^[a-zA-Z]{2,15}$/;
let checkPassword = /^\w{5,20}$/;
let checkEmail = /^(\w{1,20}|\w{1,10}\.\w{1,10})@[a-zA-Z]{0,6}\.[a-zA-Z]{0,5}$/;
let users = [];
let userIndex;
class User {
    constructor(userLogin, userPassword, userEmail) {
        this.userLogin = userLogin;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
    }
}
function render() {
    tBody.innerHTML = '';
    users.forEach((element, index) => {
        let addTr = document.createElement('tr');
        let currentIndex = index;
        for (let i = 0; i < 6; i++) {
            let addTd = document.createElement('td');
            if (i == 0) {
                addTd.innerText = index + 1;
            }
            if (i == 1) {
                addTd.innerText = element.userLogin;
            }
            if (i == 2) {
                addTd.innerText = element.userPassword;
            }
            if (i == 3) {
                addTd.innerText = element.userEmail;
            }
            if (i == 4) {
                let createEdit = document.createElement('INPUT');
                createEdit.type = "button";
                createEdit.value = 'Edit';
                createEdit.addEventListener('click', () => {
                    editUser(currentIndex);
                });
                addTd.append(createEdit);
            }
            if (i == 5) {
                let createDelete = document.createElement('INPUT');
                createDelete.classList.add('leftEdit');
                createDelete.type = "button";
                createDelete.value = 'Delete';
                createDelete.disabled = false;
                createDelete.addEventListener('click', () => {
                    deleteUser(currentIndex);
                });
                addTd.append(createDelete);
            }
            addTr.append(addTd);
        }
        tBody.append(addTr);
    });
}
function addUser(login, password, email) {
    let newUser = new User(login, password, email);
    users.push(newUser);
    loginValue.value = '';
    passwordValue.value = '';
    emailValue.value = '';
}
function deleteUser(index) {
    users.splice(index, 1);
    render();
}
function editUser(index) {
    let allLeftEdits = document.querySelectorAll('.leftEdit');
    userIndex = index;
    loginValue.value = users[index].userLogin;
    passwordValue.value = users[index].userPassword;
    emailValue.value = users[index].userEmail;
    addButton.style.display = 'none';
    editUserButton.style.display = 'block';
    for (let i = 0; i < allLeftEdits.length; i++) {
        allLeftEdits[i].disabled = true;
    }
}
function saveEditUser(log, pas, em, index) {
    let newUser = new User(log, pas, em);
    users.splice(index, 1, newUser);
    loginValue.value = '';
    passwordValue.value = '';
    emailValue.value = '';
    render();
}
addButton.addEventListener('click', () => {
    let login = loginValue.value;
    let password = passwordValue.value;
    let email = emailValue.value;
    testInputs(login, password, email);
});
editUserButton.addEventListener('click', () => {
    let login = loginValue.value;
    let password = passwordValue.value;
    let email = emailValue.value;
    saveEditUser(login, password, email, userIndex);
});
function testInputs(log, pas, em) {
    let testLogin = checkLogin.test(log);
    let testPassword = checkPassword.test(pas);
    let testEmail = checkEmail.test(em);
    if (testLogin && testPassword && testEmail) {
        addUser(log, pas, em);
        render();
    }
    if (testLogin) {
        loginValue.style.border = '1px solid gray';
        loginValue.style.color = 'black';
        loginValue.placeholder = 'Login';
    }
    else if (!testLogin) {
        loginValue.style.border = '2px solid red';
        loginValue.style.color = 'red';
        loginValue.placeholder = 'Wrong login';
        loginValue.value = '';
    }
    if (testPassword) {
        passwordValue.style.border = '1px solid gray';
        passwordValue.style.color = 'black';
        passwordValue.placeholder = 'Password';
    }
    else if (!testPassword) {
        passwordValue.style.border = '2px solid red';
        passwordValue.style.color = 'red';
        passwordValue.placeholder = 'Wrong password';
        passwordValue.value = '';
    }
    if (testEmail) {
        emailValue.style.border = '1px solid gray';
        emailValue.style.color = 'black';
        emailValue.placeholder = 'Email';
    }
    else if (!testEmail) {
        emailValue.style.border = '2px solid red';
        emailValue.style.color = 'red';
        emailValue.placeholder = 'Wrong email';
        emailValue.value = '';
    }
}
