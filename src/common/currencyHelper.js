export function convertToCurrency(txt){
    let number = Number(txt)
    number = isNaN(number) ? 0 : number
    number = number < 0 ? 0 : number

    return number.toLocaleString('vi', {style:"currency", currency:"VND"})
}