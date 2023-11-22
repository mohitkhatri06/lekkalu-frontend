export const moneyWithNotation = (val: number) => {
  let value_with_notation
  if (val >= 10000000) {
    value_with_notation = (val / 10000000).toFixed(2) + ' Cr'
  } else if (val >= 100000) {
    value_with_notation = (val / 100000).toFixed(2) + ' Lacs'
  } else if (val >= 1000) {
    value_with_notation = (val / 1000).toFixed(2) + ' K'
  } else {
    value_with_notation = val
  }
  return value_with_notation
}
