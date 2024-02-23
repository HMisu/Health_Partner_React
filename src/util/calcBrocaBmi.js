export const calcBrocaBmi = ({height, mass, gender}) => {
    let broca = (height - (gender === "male" ? 100 : 105)) * 0.9;
    let bmi = height / 100 * height / 100 * (gender === "male" ? 22 : 21);
    if (gender === "male") {
        broca = (height - 100 * 0.9).toFixed(2);
        bmi = (height / 100 * height / 100 * 22).toFixed(2);
    } else {
        broca = (height - 100 * 0.9).toFixed(2);
        bmi = (height / 100 * height / 100 * 21).toFixed(2);
    }
    const obesityUsingBroca = ((mass - broca) / broca * 100).toFixed(2);
    const obesityUsingBmi = ((mass - bmi) / bmi * 100).toFixed(2);
    return {
        broca,
        bmi,
        obesityUsingBroca,
        obesityUsingBmi
    };
}