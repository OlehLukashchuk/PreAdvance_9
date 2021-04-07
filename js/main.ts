// Доступ до DOM елементів
let loginValue = document.querySelector('.log') as HTMLInputElement;
let passwordValue = document.querySelector('.pas') as HTMLInputElement;
let emailValue = document.querySelector('.email') as HTMLInputElement;
let addButton = document.getElementById('add') as HTMLButtonElement;
let editUserButton = document.getElementById('edit') as HTMLButtonElement;
let tBody = document.getElementById('tbody') as HTMLTableElement;

// Змінні RegEx
let checkLogin: RegExp = /^[a-zA-Z]{2,15}$/;
let checkPassword: RegExp = /^\w{5,20}$/;
let checkEmail: RegExp = /^(\w{1,20}|\w{1,10}\.\w{1,10})@[a-zA-Z]{0,6}\.[a-zA-Z]{0,5}$/;

//Основний інтерфейс для створення нового користувача
interface IUser {
  userLogin: string;
  userPassword: string;
  userEmail: string;
}
// Массив для запам'ятовування користувачів.
let users: Array<IUser> = [];

let userIndex: IUser;

// Класс користувач
class User implements IUser {
  constructor(public userLogin: string, public userPassword: string, public userEmail: string) { }
}

// Функція-Генератор елементів в таблиці відносно массиву users.
function render(): void {
  tBody.innerHTML = '';

  users.forEach((element: IUser, index: number): void => {
    let addTr = document.createElement('tr') as HTMLTableRowElement;
    let currentIndex: number = index;
    for (let i: number = 0; i < 6; i++) {
      let addTd: any = document.createElement('td') as HTMLTableCellElement;
      // Наповнення наших td залежно від поточного індекса
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
        let createEdit = document.createElement('INPUT') as HTMLInputElement;
        createEdit.type = "button"
        createEdit.value = 'Edit'
        createEdit.addEventListener('click', (): void => {
          //Виклик editUser при кліку на кнопку Edit(редактор користувача)
          editUser(currentIndex);
        })
        addTd.append(createEdit);
      }
      if (i == 5) {
        let createDelete = document.createElement('INPUT') as HTMLInputElement;
        createDelete.classList.add('leftEdit');
        createDelete.type = "button"
        createDelete.value = 'Delete'
        createDelete.disabled = false;
        createDelete.addEventListener('click', (): void => {
          //Виклик deleteUser при кліку на кнопку Delete(видалення користувача)
          deleteUser(currentIndex);
        })
        addTd.append(createDelete);
      }
      addTr.append(addTd);
    }
    tBody.append(addTr);
  })
}

// Функція добавлення користувача в наш массив , якщо усі поля вірно заповнені.
function addUser(login: string, password: string, email: string): void {

  // Створення нового користувача.
  let newUser: IUser = new User(login, password, email)

  // Додавання в массив.
  users.push(newUser);

  loginValue.value = '';
  passwordValue.value = '';
  emailValue.value = '';

}

// Функція видалення користувача.
function deleteUser(index): void {
  //Видалення користувача з массиву відповідно переданому індексу.
  users.splice(index, 1);
  // Генеруємо елементи відносно змін.
  render();
}

// Функція редактор користувача
function editUser(index): void {
  let allLeftEdits = document.querySelectorAll<HTMLButtonElement>('.leftEdit');
  userIndex = index;
  loginValue.value = users[index].userLogin;
  passwordValue.value = users[index].userPassword;
  emailValue.value = users[index].userEmail;
  addButton.style.display = 'none';
  editUserButton.style.display = 'block';

  //Після кліку на едіт відключаємо змогу видалити користувача до момента збереження змін.
  for (let i: number = 0; i < allLeftEdits.length; i++) {
    allLeftEdits[i].disabled = true;
  }
}


// Функція зберігання нових данних по користувачу .
function saveEditUser(log, pas, em, index): void {

  //Створення користувача з новими данними і заміна старих в массиві.
  let newUser: IUser = new User(log, pas, em);
  users.splice(index, 1, newUser);

  loginValue.value = '';
  passwordValue.value = '';
  emailValue.value = '';
  addButton.style.display = 'block';
  editUserButton.style.display = 'none';
  // Генеруємо усі елементи з новими данними по користувачу.
  render();
}


addButton.addEventListener('click', (): void => {

  let login: string = loginValue.value;
  let password: string = passwordValue.value;
  let email: string = emailValue.value;
  // При кілку на кнопку Add ,спочатку перевіряються усі поля.
  testInputs(login, password, email)

})

editUserButton.addEventListener('click', (): void => {
  let login: string = loginValue.value;
  let password: string = passwordValue.value;
  let email: string = emailValue.value;
  // Клік на edit вносить зміни.
  saveEditUser(login, password, email, userIndex);
})


// Функція "тест" усіх інпут-полів на правильне введення.
function testInputs(log: string, pas: string, em: string): void {

  let testLogin: boolean = checkLogin.test(log);
  let testPassword: boolean = checkPassword.test(pas);
  let testEmail: boolean = checkEmail.test(em);

  //Якщо все вірно створюємо нового користувача і виводимо на екран.
  if (testLogin && testPassword && testEmail) {
    addUser(log, pas, em);
    render();
  }
  // Зміна стилізації інпутів залежно від true/false.
  if (testLogin) {
    loginValue.style.border = '1px solid gray'
    loginValue.style.color = 'black'
    loginValue.placeholder = 'Login';
  }
  else if (!testLogin) {
    loginValue.style.border = '2px solid red'
    loginValue.style.color = 'red'
    loginValue.placeholder = 'Wrong login';
    loginValue.value = '';
  }
  if (testPassword) {
    passwordValue.style.border = '1px solid gray'
    passwordValue.style.color = 'black'
    passwordValue.placeholder = 'Password';
  }
  else if (!testPassword) {
    passwordValue.style.border = '2px solid red'
    passwordValue.style.color = 'red'
    passwordValue.placeholder = 'Wrong password';
    passwordValue.value = '';
  }
  if (testEmail) {
    emailValue.style.border = '1px solid gray'
    emailValue.style.color = 'black'
    emailValue.placeholder = 'Email';
  }
  else if (!testEmail) {
    emailValue.style.border = '2px solid red'
    emailValue.style.color = 'red'
    emailValue.placeholder = 'Wrong email';
    emailValue.value = '';
  }
}