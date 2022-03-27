import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";

import { useContent } from "content/contentContext";

const Home = () => {
  const {
    home: { pageTitle, title, createLink, viewLink },
  } = useContent();

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen flex flex-col items-center">
        <h1 className="text-center text-white text-6xl w-96 m-12">{title}</h1>
        <button className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
          <Link href="/itemRecord/create">
            <a>{createLink}</a>
          </Link>
        </button>
        <div className="m-4"></div>
        <button className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
          <Link href="/food-records">
            <a>{viewLink}</a>
          </Link>
        </button>
      </main>
    </div>
  );
};

export default Home;
