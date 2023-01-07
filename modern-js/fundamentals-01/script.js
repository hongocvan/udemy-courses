/* Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
    1. Store Mark's and John's mass and height in variables
    2. Calculate both their BMIs using the formula (you can even implement both versions)
    3. Create a Boolean variable 'markHigherBMI' containing information about
        whether Mark has a higher BMI than John.
Test data:
    1. Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95m tall.
    2. Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76m tall.
*/

console.log('--- Coding Challenge #1 ---');

const testData1 = [
    {
        mark: {
            mass: 78,
            height: 1.69,
        },
        john: {
            mass: 92,
            height: 1.95,
        },
    },
    {
        mark: {
            mass: 95,
            height: 1.88,
        },
        john: {
            mass: 85,
            height: 1.76,
        },
    },
];

function calcBMI(mass, height) {
    return mass / height ** 2;
}

for (let i = 0; i < testData1.length; i++) {
    console.log(`Data #${i}`);
    const data = testData1[i];
    const markBMI = calcBMI(data.mark.mass, data.mark.height);
    const johnBMI = calcBMI(data.john.mass, data.john.height);
    const markHigherBMI = markBMI > johnBMI;
    console.log(`
        Mark's BMI: ${markBMI},
        John's BMI: ${johnBMI},
        markHigherBMI: ${markHigherBMI}
    `);
}

/* Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
    1. Print a nice output to the console, saying who has the higher BMI. The message
        is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
    2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
        BMI (28.3) is higher than John's (23.9)!"
*/

console.log('--- Coding Challenge #2 ---');

function printMessage(markBMI, johnBMI) {
    const markHigherBMI = markBMI > johnBMI;
    const markHigherMessage = `Mark's BMI (${markBMI.toFixed(
        1
    )})  is higher than John's (${johnBMI.toFixed(1)})!`;
    const johnHigherMessage = `John's BMI (${johnBMI.toFixed(
        1
    )}) is higher than Mark's (${markBMI.toFixed(1)})!`;
    const message = markHigherBMI ? markHigherMessage : johnHigherMessage;
    console.log(`
        Mark's BMI: ${markBMI},
        John's BMI: ${johnBMI},
        message: ${message}
    `);
}

for (let i = 0; i < testData1.length; i++) {
    console.log(`Data #${i}`);
    const data = testData1[i];
    const markBMI = calcBMI(data.mark.mass, data.mark.height);
    const johnBMI = calcBMI(data.john.mass, data.john.height);
    printMessage(markBMI, johnBMI);
}

/* Coding Challenge #3
There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
    1. Calculate the average score for each team, using the test data below
    2. Compare the team's average scores to determine the winner of the competition,
        and print it to the console. Don't forget that there can be a draw, so test for that
        as well (draw means they have the same average score)
    3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
        team only wins if it has a higher score than the other team, and the same time a
        score of at least 100 points. Hint: Use a logical operator to test for minimum
        score, as well as multiple else-if blocks �
    4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
        both teams have the same score and both have a score greater or equal 100
        points. Otherwise, no team wins the trophy
Test data:
    1. Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
    2. Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
    3. Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

console.log('--- Coding Challenge #3 ---');

const testData3 = [
    {
        dolphins: [96, 108, 89],
        koalas: [88, 91, 110],
    },
    {
        dolphins: [97, 112, 101],
        koalas: [109, 95, 123],
    },
    {
        dolphins: [97, 112, 101],
        koalas: [109, 95, 106],
    },
];

function add(num1, num2) {
    return num1 + num2;
}

function calcAverageScore(scoreArray) {
    const scoreSum = scoreArray.reduce(add, 0);
    const scoreAverage = scoreSum / scoreArray.length;
    return scoreAverage.toFixed(1);
}

for (let i = 0; i < testData3.length; i++) {
    console.log(`Data #${i}`);
    const data = testData3[i];
    const dolphinsAverageScore = calcAverageScore(data.dolphins);
    const koalasAverageScore = calcAverageScore(data.koalas);
    let result;

    if (
        dolphinsAverageScore > koalasAverageScore &&
        dolphinsAverageScore >= 100
    ) {
        result = 'DOPHINS WON!';
    } else if (
        dolphinsAverageScore < koalasAverageScore &&
        koalasAverageScore >= 100
    ) {
        result = 'KOALAS WON!';
    } else if (
        dolphinsAverageScore === koalasAverageScore &&
        dolphinsAverageScore >= 100 &&
        koalasAverageScore >= 100
    ) {
        result = 'A DRAW!';
    } else {
        result = 'SOMETHING ELSE!';
    }
    console.log(`
        Dolphins average score: ${dolphinsAverageScore}
        Koalas average score: ${koalasAverageScore}
        =>>> ${result}
    `);
}

/* Coding Challenge #4
Steven wants to build a very simple tip calculator for whenever he goes eating in a
restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
300. If the value is different, the tip is 20%.
Your tasks:
    1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
        this. It's not allowed to use an if/else statement � (If it's easier for you, you can
        start with an if/else statement, and then try to convert it to a ternary
        operator!)
    2. Print a string to the console containing the bill value, the tip, and the final value
        (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
        316.25”
Test data:
    1. Data 1: Test for bill values 275, 40 and 430
Hints:
    - To calculate 20% of a value, simply multiply it by 20/100 = 0.2
    - Value X is between 50 and 300, if it's >= 50 && <= 300 �
*/

console.log('--- Coding Challenge #4 ---');

const MIN_TIP_BILL_VALUE = 50;
const MAX_TIP_BILL_VALUE = 300;

function calTipValue(billValue, minTipBillValue, maxTipBillValue) {
    return minTipBillValue <= billValue <= maxTipBillValue ? 0.15 : 0.2;
}

function calcFinalBillValue(billValue, tipValue) {
    return billValue + tipValue * billValue;
}

function printBillValue(billValue, tipValue, finalBillValue) {
    console.log(`
        Bill value: $${billValue}
        Tip: ${
            tipValue * 100
        }% (with between $${MIN_TIP_BILL_VALUE} to $${MAX_TIP_BILL_VALUE} the tip is 15%, 20% otherwise)
        =>>> Final bill: $${finalBillValue}
    `);
}

const billValue = 275;
const tipValue = calTipValue(billValue, MIN_TIP_BILL_VALUE, MAX_TIP_BILL_VALUE);
const finalBillValue = calcFinalBillValue(billValue, tipValue);
printBillValue(billValue, tipValue, finalBillValue);
