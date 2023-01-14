'use strict';

const calcAge = (birthYear) => {
    const age = 2023 - birthYear;

    const printSummary = () => {
        const fullName = `${firstName} ${lastName}`;
        console.log(`Your name: ${fullName}`);
        console.log(`You are ${age}, born in ${birthYear}`);

        if (birthYear >= 1990) {
            var newBirthYear = 2023;
            const str = 'Ohm, amazing!';
            console.log(str);
        }

        console.log(`Can access to variable 'newBirthYear' = ${newBirthYear}`);
    };

    printSummary();

    return age;
};

let firstName = 'Ho Ngoc';
const lastName = 'Van';
calcAge(1997);
