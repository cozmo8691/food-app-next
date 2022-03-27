import { NextPageContext } from "next";
import Link from "next/link";
import Head from "next/head";
import nookies from "nookies";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { create } from "lib/mutations";
import Button from "components/Button";
import Input from "components/Input";
import Select from "components/Select";
import { validateToken } from "lib/auth";
import getConfig from "next/config";
import { useContent } from "content/contentContext";
import prisma from "lib/prisma";

const {
  publicRuntimeConfig: { logoutUrl },
} = getConfig();

const CreateItemRecordPage = ({ items }: { items: any }) => {
  const [itemId, setItemId] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    createItem: { pageTitle, title, form },
  } = useContent();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));
    // await sleep();

    await create({
      itemId: +itemId,
      itemQuantity: +itemQuantity,
      itemSize: +itemSize,
      itemValue: +itemValue,
    });
    setIsLoading(false);
    router.push("/");
  };

  console.log(items);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1 className="text-center text-4xl w-96 mt-12 text-gray-700">{title}</h1>
      <div className="w-3/4 p-6 rounded-lg shadow-lg bg-white max-w-sm mt-4">
        <form onSubmit={handleSubmit}>
          <Select
            name={"itemName"}
            label={form.itemId.label}
            value={itemId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setItemId(e.target.value)
            }
            options={items.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))}
          />

          <Input
            name={"itemQuantity"}
            label={form.itemQuantity.label}
            value={itemQuantity}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemQuantity(e.target.value)
            }
            placeholder={form.itemQuantity.placeholder}
          />
          <Input
            name={"itemSize"}
            label={form.itemSize.label}
            value={itemSize}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemSize(e.target.value)
            }
            placeholder={form.itemSize.placeholder}
          />
          <Input
            name={"itemValue"}
            label={form.itemValue.label}
            value={itemValue}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemValue(e.target.value)
            }
            placeholder={form.itemValue.placeholder}
          />
          <Button label={form.cta} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);

  try {
    validateToken(cookies.LISTAPP_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: logoutUrl,
      },
    };
  }

  const items = await prisma.item.findMany({
    where: {},
  });

  return {
    props: { items },
  };
};
export default CreateItemRecordPage;
