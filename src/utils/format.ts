const round = (num: number, decimals: number) => {
  const decimal_correction = 10 ** decimals
  const big = num * decimal_correction
  const rounded = Math.round(big)
  return rounded / decimal_correction
}

export const formatPercentage = (
  decimal_percentage: number,
  decimals: number = 0,
) => `${round(decimal_percentage * 100, decimals)}%`

export const formatMoney = (money?: number) =>
  money ? `${round(money, 2).toFixed(2)} NOK` : '0.00 NOK'
