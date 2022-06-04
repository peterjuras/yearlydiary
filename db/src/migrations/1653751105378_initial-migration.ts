import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";
import { POSTS_TABLE } from "../constants";

export const shorthands: ColumnDefinitions | undefined = undefined;

exports.up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.createTable(POSTS_TABLE, {
    id: "id",
    user_id: {
      type: "text",
      notNull: true,
    },
    day: {
      type: "smallint",
      notNull: true,
    },
    month: {
      type: "smallint",
      notNull: true,
    },
    year: {
      type: "smallint",
      notNull: true,
    },
    answer: {
      type: "text",
      notNull: true,
    },
  });
  pgm.createIndex(POSTS_TABLE, "user_id");
  pgm.createIndex(POSTS_TABLE, ["day", "month"]);
};

exports.down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.dropTable(POSTS_TABLE);
};
