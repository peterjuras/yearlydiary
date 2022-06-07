import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";
import { POSTS_TABLE, USERS_TABLE } from "../constants";

export const shorthands: ColumnDefinitions | undefined = undefined;

exports.up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.createTable(USERS_TABLE, {
    id: "id",
    user_id: {
      type: "text",
      notNull: true,
      unique: true,
    },
    public_posts: {
      type: "boolean",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: "NOW()",
    },
  });

  pgm.createTable(POSTS_TABLE, {
    id: "id",
    user_id: {
      type: "id",
      notNull: true,
      references: USERS_TABLE,
      onDelete: "CASCADE",
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
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: "NOW()",
    },
  });
  pgm.createIndex(POSTS_TABLE, "user_id");
  pgm.createIndex(POSTS_TABLE, ["day", "month"]);
};

exports.down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.dropTable(POSTS_TABLE);
  pgm.dropTable(USERS_TABLE);
};
