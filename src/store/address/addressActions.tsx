import exp from "constants";
import api from "../../api";
import Address from "../../interfaces/Address";
import { thunkWrapper } from "../thunkWrapper";

export const getAddresses = thunkWrapper("addresses/get", async () => {
  const response = await api.get("address/");
  return response.data;
});

export const addAddress = thunkWrapper(
  "addresses/post",
  async (addressData: Address) => {
    const response = await api.post("address/", addressData);
    return response.data;
  }
);

export const deleteAddress = thunkWrapper(
  "addresses/delete",
  async (id: number) => {
    await api.delete(`address/${id}/`);
    return id;
  }
);

export const updateAddress = thunkWrapper(
  "addresses/update",
  async (addressData: {
    id: number;
    name: string;
    address: string;
    mobile_number: string;
    desc: string;
  }) => {
    const response = await api.put(`address/${addressData.id}/`, addressData);
    return response.data;
  }
);
