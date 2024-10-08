export const nearProducts = async (latitude: number, longitude: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}homeprod`, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({latitude, longitude})
    })

    return res.json()
}