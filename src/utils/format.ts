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

export const formatMoney = (money?: number, decimals: number = 2) =>
  `${round(money ?? 0, 2).toFixed(decimals)} NOK`
