export const apiRoute = (route: string) => {
  if (!route.startsWith('/')) {
    route = `/${route}`
  }

  const host = import.meta.env.VITE_NOKRONER_API_HOST
  const port = import.meta.env.VITE_NOKRONER_API_PORT

  const path = `${host}:${port}${route}`
  console.log(path)
  return path
}

export const makeAuthHeader = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${token}`,
    },
  }
}

export const getAuthToken = (response: Response) => {
  return response.headers.get('Authentication')?.split(' ')[1]
}
