
export function checkEmail(email: string): boolean {
    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

    return emailRegex.test(email)
}

export function checkPassword(password: string): boolean {
    // TODO: Add more password requirements
    return password.length >= 4
}

export function checkUsername(username: string): boolean {
    return username.length >= 2 && username.length <= 64
}