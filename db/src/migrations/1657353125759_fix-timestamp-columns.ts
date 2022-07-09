/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";
import { POSTS_TABLE, USERS_TABLE } from "../constants";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn(USERS_TABLE, "created_at", {
    default: pgm.func("NOW()"),
  });
  pgm.alterColumn(POSTS_TABLE, "created_at", {
    default: pgm.func("NOW()"),
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn(USERS_TABLE, "created_at", {
    default: "NOW()",
  });
  pgm.alterColumn(POSTS_TABLE, "created_at", {
    default: "NOW()",
  });
}
