import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
import { pbkdf2Sync, randomBytes } from 'crypto';

function generatePassword(password) {
    const salt = randomBytes(32).toString('hex');
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { hash, salt };
}

const prisma = new PrismaClient()
async function main() {
    const { hash, salt } = generatePassword('testpass');
    for (let i = 1; i <= 5; i++) {
        const email = `user_${i}@test.com`;
        const existingUser = await prisma.users.findFirst({
            where: { email }
        });

        if (!existingUser) {
            const user = await prisma.users.create({
                data: {
                    id: uuidv4(),
                    email: `user_${i}@test.com`,
                    password: hash,
                    salt,
                },
            });
        };
    }
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
