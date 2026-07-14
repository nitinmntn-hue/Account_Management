const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Prisma Connected");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
  } catch (err) {
    console.error("❌ Prisma Connection Error");
    console.error(err);
  }
})();

module.exports = prisma;
