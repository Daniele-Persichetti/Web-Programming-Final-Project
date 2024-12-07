const API_URL = import.meta.env.PROD
  ? `${window.location.origin}/api/v1/` // Production: relative path
  : 'http://localhost:3000/api/v1/' // Development: local server

export async function rest<T>(url: string, data?: any, method?: string): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

  try {
    const response = await fetch(url, {
      method: method ?? (data ? 'POST' : 'GET'),
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      // Try to get error details from response
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out after 5 seconds')
    }
    throw error
  }
}

export function api<T>(url: string, data?: any, method?: string): Promise<T> {
  console.log(`Making ${method || (data ? 'POST' : 'GET')} request to:`, API_URL + url)
  if (data) console.log('With data:', data)

  return rest<T>(API_URL + url, data, method).catch((error) => {
    console.error('API request failed:', error)
    throw error
  })
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
