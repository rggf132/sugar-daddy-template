export const createQueryKeyString = (params: Record<string, any>) => {
  const queryString = Object.keys(params)
    .filter((k) => !!params[k])
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
  return queryString ? `?${queryString}` : ''
}
