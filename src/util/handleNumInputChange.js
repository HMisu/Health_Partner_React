export const handleNumInputChange = (event) => {
    const inputValue = event.target.value.replace(/[^\d.]/g, "");
    const maxLength = parseInt(event.target.maxLength);

    const dotIndex = inputValue.indexOf('.');
    if (dotIndex !== -1) {
        const integerPart = inputValue.slice(0, dotIndex);
        const decimalPart = inputValue.slice(dotIndex + 1, dotIndex + 2);
        event.target.value = `${integerPart}.${decimalPart}`;
    } else {
        event.target.value = inputValue.slice(0, maxLength);
    }
};