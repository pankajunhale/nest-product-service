import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    try {
        // cleanup the existing database
        handleUsers();
        handleProducts();
        console.info(`Database has been seeded. 🌱`);
    }
    catch (error) {
        console.error(`Error in seeding the database ${error.mssage}`);
        throw error;
    }
}

const handleUsers = async () => {
    //delete existing users
    await prisma.user.deleteMany();
    const saltOrRounds = 10;
    const password = process.env.APP_USER_PASSWORD;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    await prisma.user.create({
        data: {
            name: 'Pankaj M. Unhale',
            email: process.env.APP_USER_EMAIL,
            hashedPassword,
        },
    });
};

const handleProducts = async () => {
    //delete existing products
    await prisma.product.deleteMany();
    for (let index = 0; index < 30; index++) {
        await prisma.product.upsert({
            where: {
                title: `product-${index}`
            },
            create: {
                title: `product-${index}`,
                description: `product-desc-${index}`,
                price: index,
                category: `product-category-${index}`,
            },
            update: {},
        });
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect();
        process.exit(1);
    })