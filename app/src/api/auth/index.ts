import {BE_URL} from "../../lib/Constants";

export const loginApi = async (email, password) => {
    const res = await fetch(`${BE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    const json = await res.json()

    if (!res.ok) {
        throw new Error(json.code)
    }

    return json.data
}

export const registerApi = async (email, password) => {
    const res = await fetch(`${BE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
    })
    const json = await res.json()

    if (!res.ok) {
        throw new Error(json.code)
    }

    return json
}
