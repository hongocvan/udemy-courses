'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Ho Ngoc Van',
    movements: [250, 90, -120, 1300, -570, 924, 2970, -700],
    interestRate: 0.1,
    pin: 1807,

    movementsDates: [
        new Date(new Date() - 1000 * 60 * 60 * 25).toISOString(),
        '2022-12-25T06:04:23.907Z',
        new Date(new Date() - 1000 * 60 * 60 * 49).toISOString(),
        '2022-01-25T14:18:46.235Z',
        '2021-02-05T16:33:06.386Z',
        new Date(new Date() - 1000 * 60 * 60 * 1).toISOString(),
        '2021-06-25T18:49:59.371Z',
        new Date(new Date() - 1000 * 60 * 60 * 75).toISOString(),
    ],
    currency: 'VND',
    locale: 'vi-VN',
};

const accounts = [account1, account2];

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
let timer, currentAccount;

const padZeroToNumber = function (number, targetLength) {
    return number.toString().padStart(targetLength, 0);
};

const calcDaysPassed = function (date1, date2) {
    return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
};

const formatMovementDate = function (date, locale) {
    const dateObj = new Date(date);
    const daysPassed = Math.round(calcDaysPassed(new Date(), dateObj));

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(dateObj);
};

const formatCurrency = function (value, locale, currency) {
    const options = {
        style: 'currency',
        currency: currency,
    };

    return new Intl.NumberFormat(locale, options).format(value);
};

const displayCurrentDate = function () {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
    ).format(now);
};

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const displayDate = formatMovementDate(
            acc.movementsDates[i],
            acc.locale
        );

        const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

        const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">
              ${i + 1} ${type}
            </div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMov}</div>
          </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = formatCurrency(
        acc.balance,
        acc.locale,
        acc.currency
    );
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);

    labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCurrency(
        Math.abs(out),
        acc.locale,
        acc.currency
    );

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int) => int > 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCurrency(
        interest,
        acc.locale,
        acc.currency
    );
};

const updateUI = function (acc, sort = false) {
    // Display movements
    displayMovements(acc, sort);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);

    // Display current date
    displayCurrentDate();
};

const startLogOutTimer = function () {
    // Set time to 5 minutes
    let time = 300;

    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        // In each call, print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;

        // When 0 seconds, stop timmer and log out user
        if (time === 0) {
            clearInterval(timer);

            labelWelcome.textContent = `Log in to get started`;
            inputLoginUsername.value = 'hnv';
            inputLoginPin.value = 1807;
            containerApp.style.opacity = 0;
        }

        // Decrese 1s
        time--;
    };

    // Call the timer every second
    tick();
    return setInterval(tick, 1000);
};

const clearAndResetTimer = function () {
    clearInterval(timer);
    timer = startLogOutTimer();
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
            acc.pin === +inputLoginPin.value
    );

    if (currentAccount) {
        // Display UI and welcome message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner}!`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        updateUI(currentAccount);

        clearAndResetTimer();
    } else {
        containerApp.style.opacity = 0;
        alert('Incorrect username or pin!');
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
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
        // Add movements
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        // Add movement date
        const now = new Date().toISOString();
        currentAccount.movementsDates.push(now);
        receiverAccount.movementsDates.push(now);

        updateUI(currentAccount);

        // Reset timer
        clearAndResetTimer();
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
        +inputClosePin.value === currentAccount.pin
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

    const amount = Math.floor(inputLoanAmount.value);
    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        setTimeout(function () {
            // Add movement
            currentAccount.movements.push(amount);

            // Add loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            // Update UI
            updateUI(currentAccount);

            // Reset timer
            clearAndResetTimer();
        }, 3000);
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
