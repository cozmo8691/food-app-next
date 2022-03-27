import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import nookies from "nookies";
import prisma from "lib/prisma";
import { validateToken } from "lib/auth";
import { useContent } from "content/contentContext";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { logoutUrl },
} = getConfig();

const FoodRecords = ({
  itemRecords = [],
}: {
  itemRecords: {
    itemId: string;
    itemQuantity: number;
    itemSize: number;
    itemValue: number;
  }[];
}) => {
  const {
    home: { pageTitle, title, createLink, viewLink },
  } = useContent();

  console.log(itemRecords);

  return (
    <>
      <Link href="/">
        <a>home</a>
      </Link>
      <h1>Your food waste records</h1>
      <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Name
            </th>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Quantity
            </th>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Value
            </th>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Date/Time
            </th>
          </tr>
        </thead>
        <tbody>
          {itemRecords.map(
            ({
              id,
              item: { name },
              itemQuantity,
              itemValue,
              createdAt,
            }: any) => {
              return (
                <tr key={id}>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {name}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {itemQuantity}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {itemValue}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {new Date(createdAt).toLocaleString()}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);
  let user;

  try {
    user = validateToken(cookies.LISTAPP_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: logoutUrl,
      },
    };
  }

  console.log(user);

  const itemRecords = await prisma.itemRecord.findMany({
    where: { userId: user.id },
    include: {
      item: {},
    },
  });

  return {
    props: { itemRecords },
  };
};

export default FoodRecords;
