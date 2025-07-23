export async function fetchAppEnv() {
    try {
        const res = await fetch('/api/getEnvConfig', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            throw new Error('Ошибка при запросе данных.')
        }

        const response: { cryptoLink: boolean; buyLink: string; redirectLink: string } =
            await res.json()
        return response
    } catch (error) {
        console.error('Ошибка:', error)
    }
}
