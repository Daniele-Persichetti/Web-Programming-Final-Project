const BASE_URL = import.meta.env.PROD
  ? 'https://web-programming-final-project-fitness-app.onrender.com'
  : 'http://localhost:3000'

const API_ROOT = '/api/v1'

export async function rest<T>(url: string, data?: any, method?: string): Promise<T> {
  const response = await fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export function api<T>(path: string, data?: any, method?: string): Promise<T> {
  const url = `${BASE_URL}${API_ROOT}/${path}`
  console.log('Calling API:', url)
  return rest<T>(url, data, method)
}

export async function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = url
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.head.appendChild(script)
  })
}
