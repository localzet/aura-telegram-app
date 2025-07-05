export async function POST() {
    try {
        const isHappCryptoLinkEnabled = process.env.CRYPTO_LINK === 'true'
        const buyLink = process.env.BUY_LINK
        const redirectLink = process.env.REDIRECT_LINK || 'https://localzet.github.io/redirect?redirect_to='


        return new Response(JSON.stringify({
            cryptoLink: isHappCryptoLinkEnabled,
            buyLink,
            redirectLink
        }), { status: 200 })

    } catch (error) {
        console.error('Error:', error)
        return new Response(JSON.stringify({ error: 'Server error.' }), { status: 500 })
    }
}
