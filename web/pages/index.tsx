import type { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  return null;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();

  return {
    redirect: {
      destination: `/diary/${month + 1}/${day}`,
      permanent: false,
    },
  };
};
