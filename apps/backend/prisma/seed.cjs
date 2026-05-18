const { randomBytes, scryptSync } = require('node:crypto');
const { PrismaClient, UserRole } = require('@prisma/client');

const prisma = new PrismaClient();

function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} must be set for first-run admin provisioning`);
    }
    return value;
}

function hashPassword(password) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `scrypt:${salt}:${hash}`;
}

async function main() {
    const email = requireEnv('FIRST_RUN_ADMIN_EMAIL').trim().toLowerCase();
    const password = requireEnv('FIRST_RUN_ADMIN_PASSWORD');
    const name = process.env.FIRST_RUN_ADMIN_NAME?.trim() || 'Proberoom Admin';

    await prisma.user.upsert({
        where: { email },
        update: {
            name,
            role: UserRole.ADMIN,
        },
        create: {
            email,
            name,
            passwordHash: hashPassword(password),
            role: UserRole.ADMIN,
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
