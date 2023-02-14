'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const account5 = {
    owner: 'Ho Ngoc Van',
    movements: [250, 90, -12, 300, -57, 24, 97, -700, 345, 100, -420, 197],
    interestRate: 0.1,
    pin: 1807,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let isSorted = false;
let currentAccount;

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">
              ${i + 1} ${type}
            </div>
            <div class="movements__value">${mov}$</div>
          </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} VND`;
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes} VND`;

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)} VND`;

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int) => int > 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest} VND`;
};

const updateUI = function (acc, sort = false) {
    // Display movements
    displayMovements(acc.movements, sort);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

const createUserNames = function (accounts) {
    accounts.forEach(function (account) {
        account.username = account.owner
            .toLowerCase()
            .split(' ')
            .map((word) => word[0])
            .join('');
    });
};

createUserNames(accounts);

btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();
    console.log('LOGIN', inputLoginUsername.value, inputLoginPin.value);
    currentAccount = accounts.find(
        (acc) =>
            acc.username === inputLoginUsername.value &&
            acc.pin === Number(inputLoginPin.value)
    );

    if (currentAccount) {
        // Display UI and welcome message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        updateUI(currentAccount);
    } else {
        containerApp.style.opacity = 0;
        alert('Incorrect username or pin!');
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAccount = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );
    inputTransferTo.value = inputTransferAmount.value = '';

    if (
        receiverAccount &&
        amount > 0 &&
        currentAccount.balance >= amount &&
        receiverAccount?.username !== currentAccount.username
    ) {
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        updateUI(currentAccount);
    } else {
        alert(
            'Transfer invalid, please check receiver account or input amount!'
        );
    }
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        currentAccount.username === inputCloseUsername.value &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const accountIndex = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );

        // Clear input fields
        inputCloseUsername.value = inputClosePin.value = '';

        // Delete account
        accounts.splice(accountIndex, 1);

        // Logout account
        currentAccount = undefined;

        containerApp.style.opacity = 0;
    } else {
        alert('Incorrect username or pin!');
    }
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);
    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        // Add movement
        currentAccount.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    } else {
        alert('Invalid amount!');
    }

    inputLoanAmount.value = '';
});

btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    updateUI(currentAccount, !isSorted);
    isSorted = !isSorted;
});
