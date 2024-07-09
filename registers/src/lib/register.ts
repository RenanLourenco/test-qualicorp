//@ts-ignore
import { RequestError } from "@/types/error";
//@ts-ignore
import { useAppStore } from "@/stores/app";

import axios, { AxiosError } from "axios";

export type GetRegisterResponse = {
  error: boolean;
  message: string;
  data: {
    id: string;
    dateOnly: string;
    name: string;
    registeredAt: string;
  }[];
};
export type UpdateRegisterResponse = {
  error: boolean;
  message: string;
};
export type UpdateRegisterBody = {
  name: string;
};

export type DeleteRegisterResponse = {
  error: boolean
  message: string
}

export type CreateRegisterResponse = {
  error: boolean
  message: string
}

export default class Register {
  static async getRegisters() {
    try {
      const store = useAppStore();
      const token = store.token;

      //@ts-ignore
      const ans = await axios.get<GetRegisterResponse>(
        `${import.meta.env.VITE_API_URL}/registers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return ans.data.data;
    } catch (error) {
      const err = error as AxiosError<RequestError>;
      throw new Error(err.response?.data.message);
    }
  }
  static async updateRegister(id: string, body: UpdateRegisterBody) {
    try {
      const store = useAppStore();
      const token = store.token;

      //@ts-ignore
      const ans = await axios.put<UpdateRegisterResponse>(
        `${import.meta.env.VITE_API_URL}/register/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return ans.data.message
    } catch (error) {
      const err = error as AxiosError<RequestError>;
      throw new Error(err.response?.data.message);
    }
  }
  static async deleteRegister(id: string) {
    try {
      const store = useAppStore();
      const token = store.token;

      //@ts-ignore
      const ans = await axios.delete<DeleteRegisterResponse>(`${import.meta.env.VITE_API_URL}/register/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })

      return ans.data.message;

    } catch (error) {
      const err = error as AxiosError<RequestError>;
      throw new Error(err.response?.data.message);
    }
  }
  static async createRegister(name: string) {
    try {
      const store = useAppStore();
      const token = store.token;

      const ans = await axios.post<CreateRegisterResponse>(`${import.meta.env.VITE_API_URL}/register`, {
        name,
      },{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })

      return ans.data.message

    } catch (error) {
      const err = error as AxiosError<RequestError>;
      throw new Error(err.response?.data.message);
    }
  }
}
