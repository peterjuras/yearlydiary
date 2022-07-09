/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";
import { SETUP_CODES_TABLE, USERS_TABLE } from "../constants";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable(SETUP_CODES_TABLE, {
    id: "id",
    user_id: {
      type: "id",
      notNull: true,
      references: USERS_TABLE,
      onDelete: "CASCADE",
    },
    code: {
      type: "text",
      notNull: true,
      unique: true,
    },
    expires_at: {
      type: "timestamptz",
      notNull: true,
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable(SETUP_CODES_TABLE);
}
