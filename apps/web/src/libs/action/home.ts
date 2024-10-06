export const nearProducts = async (latitude: number, longitude: number) => {
    const res = await fetch('http://localhost:8000/api/homeprod', {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({latitude, longitude})
    })

    return res.json()
}