import { RequestError } from '@/types/error'
import axios, { AxiosError } from 'axios'


export type AuthLoginResponse = {
  error: boolean
  message: string
  token: string
  expiresAt: string
}

export type AuthRegisterResponse = {
  error: boolean
  message: string
}

export default class Auth {
  static async login(email: string, password: string): Promise<AuthLoginResponse> {
    try {
      const ans = await axios.post<AuthLoginResponse>(`${import.meta.env.VITE_API_URL}/login`, {email, password}, {
        headers: {
          "Content-Type":"application/json"
        }
      })

      return ans.data
    } catch (error) {
      const err = error as AxiosError<RequestError>
      throw new Error(err.response?.data.message)
    }
  }
  static async register(name: string, email: string, password: string): Promise<AuthRegisterResponse> {
    try {
      const ans = await axios.post<AuthRegisterResponse>(`${import.meta.env.VITE_API_URL}/signup`,{
        email,password,name
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })

      return ans.data
    } catch (error) {
      const err = error as AxiosError<RequestError>
      throw new Error(err.response?.data.message)
    }
  }
}


