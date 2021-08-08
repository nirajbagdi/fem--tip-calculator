'use strict';

const tips = document.querySelector('.tips');
const inputTip = document.querySelector('.input-tip');
const inputBill = document.querySelector('.input-bill');
const inputPeople = document.querySelector('.input-people');
const form = document.querySelector('.form');
const labelTip = document.querySelector('.label-tip');
const labelTotal = document.querySelector('.label-total');
const buttonReset = document.querySelector('.btn-reset');

let tip = 0;

tips.addEventListener('click', function (e) {
    const target = e.target;

    // Guard Clause
    if (!target.classList.contains('tip')) return;

    // Update tip
    tip = +target.dataset.tip || +target.value;

    // Remove and add class
    [...tips.children].forEach(tip => tip.classList.remove('selected'));
    target.classList.toggle('selected');
});

inputTip.addEventListener('keyup', function (e) {
    tip = +e.target.value;
});

form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        if (!inputPeople.value || +inputPeople.value === 0) {
            inputPeople.closest('.people-box').classList.add('error');
            return -1;
        }

        inputPeople.closest('.people-box').classList.remove('error');

        const bill = parseFloat(inputBill.value);
        const percent = tip / 100;
        const numOfPeople = +inputPeople.value;

        const totalTip = (bill * percent) / numOfPeople;
        const total = bill / numOfPeople + totalTip;

        labelTip.textContent = `$${totalTip.toFixed(2)}`;
        labelTotal.textContent = `$${total.toFixed(2)}`;
    }
});

buttonReset.addEventListener('click', function () {
    tip = 0;

    // Clear fields
    inputBill.value = '';
    inputPeople.value = '';

    // Clear selected tip option
    [...tips.children].forEach(tip => tip.classList.remove('selected'));

    // Clear label values
    labelTip.textContent = '$0.00';
    labelTotal.textContent = '$0.00';
});
