export const handleNumInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const maxLength = parseInt(event.target.maxLength);

    event.target.value = inputValue.slice(0, maxLength);
};