import bcrypt from 'bcrypt'

export async function validateBcryptPass(pass: string, encrypt: string): Promise<boolean> {
    const valid = await bcrypt.compare(pass, encrypt)
    return valid
}