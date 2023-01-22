import { cookies } from "next/headers";
import { Suspense } from "react";
import { getUserInfo, getUserPostsForDay } from "../lib/server/db";
import { questions } from "../lib/server/questions";
import LoadingSpinner from "./LoadingSpinner";
import PostInput from "./PostInput";
import QuestionDisplay from "./QuestionDisplay";
import UserDiaryPagePostsProvider from "./UserDiaryPagePostsProvider";

type UserDiaryPageProps = {
  month: number;
  day: number;
};

const UserDiaryPage: React.FC<UserDiaryPageProps> = ({ month, day }) => {
  const userId = cookies().get("userId")?.value;

  let postsPromise: ReturnType<typeof getUserPostsForDay>;
  let userInfoPromise: ReturnType<typeof getUserInfo>;
  if (!userId) {
    // TODO: Return separte UI without suspense boundary
    postsPromise = Promise.resolve([]);
    userInfoPromise = Promise.resolve({
      public_posts: true,
    });
  } else {
    postsPromise = getUserPostsForDay(userId, day, month);
    userInfoPromise = getUserInfo(userId);
  }

  const question = questions[month][day];

  // TODO: Errorboundary

  return (
    <>
      <QuestionDisplay question={question} />
      <Suspense
        fallback={
          <PostInput
            disabled
            currentYear={new Date().getFullYear()}
            month={month}
            day={day}
            publicPosts={true}
          />
        }
      >
        {/* @ts-expect-error React can't deal with async functions yet */}
        <UserDiaryPagePostsProvider
          postsPromise={postsPromise}
          userInfoPromise={userInfoPromise}
          month={month}
          day={day}
        />
      </Suspense>
    </>
  );
};

export default UserDiaryPage;
