import { cookies } from "next/headers";
import { Suspense } from "react";
import { getPostDatesForUser } from "../../lib/server/db";
import Calendar from "./Calendar";

export default function CalendarDataProvider() {
  const userId = cookies().get("userId")?.value;

  if (!userId) {
    // @ts-expect-error React can't deal with async functions yet
    return <Calendar />;
  }

  const postDatesPromise = getPostDatesForUser(userId);

  return (
    // @ts-expect-error React can't deal with async functions yet
    <Suspense fallback={<Calendar />}>
      {/* @ts-expect-error React can't deal with async functions yet */}
      <Calendar postDatesPromise={postDatesPromise} />
    </Suspense>
  );
}
