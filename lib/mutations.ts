import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const create = (body: {
  itemId: number;
  itemQuantity: number;
  itemSize: number;
  itemValue: number;
}) => {
  return fetcher(`/itemRecord/create`, body);
};
