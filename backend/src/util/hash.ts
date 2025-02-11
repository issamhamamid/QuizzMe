import * as bcrypt from 'bcrypt';

export async function hashPassword(password : string) : Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);

}

export const verifyPassword = async (plainPassword : string, hashedPassword : string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

