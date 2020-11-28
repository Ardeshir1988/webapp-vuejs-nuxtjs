function makePersianPrice(input) {
  if (input === undefined)
    return
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return input
    .toString()
    .replace(/\d/g, x => farsiDigits[x])+' تومان'
}

function covertEngDigitToPersianDigit(input) {
  if (input === undefined)
    return
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return input
    .toString()
    .replace(/\d/g, x => farsiDigits[x])
}


export default { makePersianPrice,covertEngDigitToPersianDigit };
