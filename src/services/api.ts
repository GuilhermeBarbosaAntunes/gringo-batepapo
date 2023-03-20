import { IUser } from "@/utils/types";
import axios from "axios";


export const getAxiosInstance = (user?: IUser) => {
    const url = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_API_URL : process.env.DEVELOPMENT_API_URL;
    try {
      if(user) {
        return axios.create({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-type": "appLication/json"
            },
        });
      } else {
        return axios.create({
            baseURL: url,
        });
      }
    } catch (error) {
        return axios.create({
            baseURL: url,
        });
    }
};