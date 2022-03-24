export default function RoundNumber(num, digits) {
    const offset = Math.pow(10, digits);
    return Math.floor(num * offset) / offset;
}
