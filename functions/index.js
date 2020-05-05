export const capitalize = name => {
  return name.charAt(0).toUpperCase() + name.substring(1, name.length)
}

export const formatNumberTh = number => {
  if (number) {
    const lastDigit = number.toString().charAt(0)
    switch (lastDigit) {
      case '1':
        return `${number}st`
      case '2':
        return `${number}nd`
      case '3':
        return `${number}rd`
      default:
        return `${number}th`
    }
  }
}
