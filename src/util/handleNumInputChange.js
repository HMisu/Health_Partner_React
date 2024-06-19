export const handleNumInputChange = (event, integerDigits, decimalDigits) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^\d.]/g, "");

    if (inputValue.includes('.')) {
        const parts = inputValue.split('.');
        let integerPart = parts[0] || '';
        let decimalPart = parts[1] || '';

        if (integerPart.length > integerDigits) {
            integerPart = integerPart.slice(0, integerDigits);
        }

        if (decimalPart.length > decimalDigits) {
            decimalPart = decimalPart.slice(0, decimalDigits);
        }

        if (decimalPart.length > 0) {
            inputValue = `${integerPart}.${decimalPart}`;
        } else {
            inputValue = integerPart;
        }

        event.target.value = inputValue;
    } else {
        if (inputValue.length > integerDigits) {
            inputValue = inputValue.slice(0, integerDigits) + '.' + inputValue.slice(integerDigits);
        }
        event.target.value = inputValue;
    }
};
