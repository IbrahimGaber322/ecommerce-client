import api from "../../api";
import { thunkWrapper } from "../thunkWrapper";

export const getAddresses = thunkWrapper("addresses/get", async () => {
  const response = await api.get("address/");
  return response.data;
});

export const addAddress = thunkWrapper(
  "addresses/post",
  async (addressData: {
    address: string;
    mobile_number: string;
    desc: string;
  }) => {
    const response = await api.post("address/", addressData);
    return response.data;
  }
);
