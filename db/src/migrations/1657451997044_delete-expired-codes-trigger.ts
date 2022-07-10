/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";
import { SETUP_CODES_TABLE } from "../constants";

const DELETE_EXPIRED_SETUP_CODES_TRIGGER = "DELETE_EXPIRED_SETUP_CODES_TRIGGER";
const DELETE_EXPIRED_SETUP_CODES_FUNCTION = "DELETE_EXPIRED_SETUP_CODES";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createFunction(
    DELETE_EXPIRED_SETUP_CODES_FUNCTION,
    [],
    {
      language: "plpgsql",
      returns: "TRIGGER",
    },
    `
    BEGIN
      DELETE FROM setup_codes WHERE expires_at < NOW();
      RETURN NEW;
    END
  `
  );
  pgm.createTrigger(SETUP_CODES_TABLE, DELETE_EXPIRED_SETUP_CODES_TRIGGER, {
    when: "BEFORE",
    operation: "INSERT",
    level: "STATEMENT",
    function: DELETE_EXPIRED_SETUP_CODES_FUNCTION,
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTrigger(SETUP_CODES_TABLE, DELETE_EXPIRED_SETUP_CODES_TRIGGER);
  pgm.dropFunction(DELETE_EXPIRED_SETUP_CODES_FUNCTION, []);
}
