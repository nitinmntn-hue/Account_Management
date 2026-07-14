import prisma from "./prisma.js";

export async function runTransaction(callback) {
  return prisma.$transaction(async (tx) => {
    return callback(tx);
  });
}