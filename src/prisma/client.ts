import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export type BulkUpdateEntry = {
  [key: string]: number | string | boolean | Date;
  id: number | string;
};
export type BulkUpdateEntries = BulkUpdateEntry[];

export function bulkUpdate(
  tableName: Prisma.ModelName,
  entries: BulkUpdateEntries,
): PrismaPromise<number> {
  if (entries.length === 0) return prisma.$executeRawUnsafe("SELECT 1;");

  const fields = Object.keys(entries[0]!).filter((key) => key !== "id");
  const setSql = fields
    .map((field) => `"${field}" = data."${field}"`)
    .join(", ");

  const valuesSql = entries
    .map((entry) => {
      const values = fields.map((field) => {
        const value = entry[field];
        if (typeof value === "string") {
          // Handle strings and escape single quotes
          return `'${value.replace(/'/g, "''")}'`;
        }
        if (value instanceof Date) {
          // Convert Date to ISO 8601 string format
          return `'${value.toISOString()}'`;
        }
        // Numbers and booleans are used as-is
        return value;
      });

      return `('${entry.id}', ${values.join(", ")})`;
    })
    .join(", ");

  const sql = `
    UPDATE "${tableName}"
    SET ${setSql}
    FROM (VALUES ${valuesSql}) AS data(id, ${fields
  .map((field) => `"${field}"`)
  .join(", ")})
    WHERE "${tableName}".id::text = data.id;
  `;

  return prisma.$executeRawUnsafe(sql);
}
