import { NextApiResponse } from "next";
import archiver from "archiver";
import { getUserEntry, getUserPosts } from "./db";
import { ReadableStreamBuffer } from "stream-buffers";

async function downloadUserEntry(userId: string, archive: archiver.Archiver) {
  const userEntry = await getUserEntry(userId);

  archive.append(JSON.stringify(userEntry), { name: "user.json" });
}

async function* userPostsGenerator(userId: string) {
  const limit = 20;
  let hasResults = true;
  let offset = 0;

  while (hasResults) {
    const posts = await getUserPosts(userId, offset, limit);
    hasResults = !!posts.length;
    offset += posts.length;

    yield* posts;
  }
}

async function downloadUserPosts(userId: string, archive: archiver.Archiver) {
  const stream = new ReadableStreamBuffer();
  archive.append(stream, { name: "posts.jsonl" });

  for await (const post of userPostsGenerator(userId)) {
    stream.put(`${JSON.stringify(post)}\n`, "utf8");
  }

  stream.stop();
}

export async function downloadData(userId: string, res: NextApiResponse) {
  // Set file attachment headers
  res.setHeader("Content-Disposition", "attachment; filename=yearlydiary.zip");
  res.setHeader("Content-Type", "application/zip");

  // Create zip package
  const archive = archiver("zip");
  archive.on("error", (error) => {
    throw error;
  });
  archive.pipe(res);

  await Promise.all([
    downloadUserEntry(userId, archive),
    downloadUserPosts(userId, archive),
  ]);

  archive.finalize();
}
