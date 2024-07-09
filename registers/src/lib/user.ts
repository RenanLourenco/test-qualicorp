import axios, { AxiosError } from "axios"
//@ts-ignore
import { RequestError } from '@/types/error'
import { useAppStore } from "@/stores/app"
export type UserGetResponse = {
  error: boolean,
  message: string,
  data: {
    email: string,
    name: string,
    password: string
  }
}


export default class User {
  static async getUser(email: string): Promise<UserGetResponse>{
    try {
      const store = useAppStore()

      const token = store.token

      //@ts-ignore
      const ans = await axios.get<UserGetResponse>(`${import.meta.env.VITE_API_URL}/user/${email}`, {
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      return ans.data
    } catch (error) {
      const err = error as AxiosError<RequestError>
      throw new Error(err.response?.data.message)
    }
  }
}
