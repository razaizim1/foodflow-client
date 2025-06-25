export const foodPromise = (email) => {
    return fetch(`https://b11a11-server-site.vercel.app/foods?email=${email}`).then(res => res.json());
}

export const foodLoader = async () => {
    const res = await fetch('https://b11a11-server-site.vercel.app/foods');
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
}