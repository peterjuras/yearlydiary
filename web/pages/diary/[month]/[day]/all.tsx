import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AllAnswersDiaryPage from "../../../../components/AllAnswersDiaryPage";
import Header from "../../../../components/Header";

const AllPostsForDayPage: NextPage = () => {
  const router = useRouter();
  let closeRoute = "";

  if (router.isReady) {
    closeRoute = router.asPath.replace("/all", "");
  }

  return (
    <Flex direction="column" height="100vh" maxWidth={800} margin="0 auto">
      <Header routeSuffix="/all" closeRoute={closeRoute} />
      <Flex direction="column" padding={4} flex={1}>
        <AllAnswersDiaryPage />
      </Flex>
    </Flex>
  );
};

export default AllPostsForDayPage;
