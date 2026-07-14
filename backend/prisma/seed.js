const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { name: "Super Admin" },
      { name: "Admin" },
      { name: "Manager" },
      { name: "Staff" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });