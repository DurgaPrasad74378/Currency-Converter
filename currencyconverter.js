const apiKey = '56a7dd598f2b6f03b7edf8c7';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertedAmountInput = document.getElementById('converted-amount');
const conversionRateText = document.getElementById('conversion-rate');
const fromCurrencyText = document.getElementById('from-currency-text');
const toCurrencyText = document.getElementById('to-currency-text');
const convertBtn = document.getElementById('convert-btn');

let exchangeRates = {};

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.result === 'success') {
            exchangeRates = data.conversion_rates;
            updateConversionRate();
        } else {
            console.error('Failed to exchange rate:',data.error);
        }
    } catch (error) {
        console.error('Error to exchange rates:',error);
    }
}
function updateConversionRate() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const rate = (exchangeRates[to] / exchangeRates[from]).toFixed(2);
    conversionRateText.textContent = `1.00 ${from} = ${rate} ${to}`;
    fromCurrencyText.textContent = from;
    toCurrencyText.textContent = to; 
}
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }
    const rate = exchangeRates[to] / exchangeRates[from];
    const convertedAmount = (amount * rate).toFixed(2);
    convertedAmountInput.value = convertedAmount;
}
fromCurrency.addEventListener('change', updateConversionRate);
toCurrency.addEventListener('change', updateConversionRate);
convertBtn.addEventListener('click', convertCurrency);

fetchExchangeRates();