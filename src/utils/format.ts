export const formatPercentage = (decimal_percentage: number, decimals: number = 0) => {
  const decimal_correction = 10 ** decimals
  const big = decimal_percentage * 100 * decimal_correction
  const rounded = Math.round(big)
  const percentage = rounded / decimal_correction
  return `${percentage}%`
}
