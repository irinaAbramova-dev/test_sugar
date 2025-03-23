import {BE_URL} from "../../lib/Constants";
import {getAuthorizationHeader} from "../../utils/getAuthorizationHeader";

export const listOfUsersApi = async () => {
    const res = await fetch(`${BE_URL}/api/users`, {
        method: 'GET',
        headers: getAuthorizationHeader()
    })
    const json = await res.json()

    if (!res.ok) {
        throw new Error(json.code)
    }

    return json.data
}

export const getMessages = async (userId: string) => {
    const res = await fetch(`${BE_URL}/api/chat/${userId}`, {
        method: 'GET',
        headers: getAuthorizationHeader()
    })
    const json = await res.json()
    return json.data
}
