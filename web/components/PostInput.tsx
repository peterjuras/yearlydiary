"use client";

import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { DAYS, useTime } from "react-time-sync";
import { uploadPost } from "../lib/client/api";
import { Post } from "../types/post";
import PostDisplay from "./PostDisplay";
import PublicPostsToggle from "./PublicPostsToggle";

interface PostInputProps {
  storedPost?: Post;
  disabled?: boolean;
  currentYear: number;
  day: number;
  month: number;
  publicPosts: boolean;
}

const PostInput: React.FC<PostInputProps> = ({
  storedPost,
  disabled,
  day,
  month,
  currentYear,
  publicPosts,
}) => {
  const [post, setPost] = useState("");
  const [submittedPost, setSubmittedPost] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const currentTime = useTime({ interval: DAYS });
  const currentDate = new Date(currentTime * 1000);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  const handleSaveButtonClick = async () => {
    setIsUploading(true);

    try {
      await uploadPost(day, month, currentYear, post);
      setSubmittedPost(post);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const todaysPost = submittedPost || (storedPost && storedPost.answer);

  const canSubmitPost =
    process.env.NEXT_PUBLIC_E2E_TESTS_ACTIVE ||
    (currentYear === currentDate.getFullYear() &&
      month === currentDate.getMonth() &&
      day === currentDate.getDate());
  let nextPostDateFormatted = "";
  if (!canSubmitPost) {
    const nextPostDate = new Date();

    // Hardcode year to leap year to allow display of Feb 29
    nextPostDate.setFullYear(2020);

    nextPostDate.setMonth(month);
    nextPostDate.setDate(day);

    nextPostDateFormatted = new Intl.DateTimeFormat(undefined, {
      month: "numeric",
      day: "numeric",
    }).format(nextPostDate);
  }

  const containerOpacity = disabled ? 0.4 : undefined;

  return (
    <Flex marginBottom={4} direction="column" opacity={containerOpacity}>
      {!todaysPost && canSubmitPost && (
        <>
          <Textarea
            disabled={isUploading || disabled}
            marginBottom={4}
            value={post}
            onChange={handleTextareaChange}
            placeholder="Write your text here!"
          />
          <PublicPostsToggle disabled={disabled} publicPosts={publicPosts} />
          <Button
            alignSelf="center"
            marginTop={4}
            width={200}
            isLoading={isUploading || disabled}
            onClick={handleSaveButtonClick}
          >
            Save
          </Button>
        </>
      )}
      {!todaysPost && !canSubmitPost && (
        <Text>Come back on {nextPostDateFormatted} to submit your answer!</Text>
      )}
      {!!todaysPost && (
        <>
          <PostDisplay answer={todaysPost} year={currentYear} />
          <PublicPostsToggle disabled={disabled} publicPosts={publicPosts} />
        </>
      )}
    </Flex>
  );
};

export default PostInput;
