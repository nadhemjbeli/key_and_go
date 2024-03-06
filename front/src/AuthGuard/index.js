import Cookies from 'js-cookie'; // Using js-cookie library for cookie management
export const isLoggedIn = ()=>{
    let data = localStorage.getItem("token");
    return data != null;
}

function isAuthenticated() {
    const token = Cookies.get('k_g_token'); // Replace 'authToken' with your cookie name

    if (token) {
        // Token exists, perform additional validation if needed (e.g., check expiration)
        return true;
    } else {
        return false;
    }
}

export const config = {
    headers: {
        Authorization: `Bearer ${Cookies.get('k_g_token')}`,
    },
};