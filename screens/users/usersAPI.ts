import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "./usersEntity";

export class UsersAPI {
  static baseUrl: string =
    Platform.OS === "ios" ? "localhost" : "194.255.245.201";
  static ip: string = "194.255.245.201";

  static async login(user: UsersEntity) {
    // try {
    const result = await axios.post(
      "http://" + this.ip + ":3000/auth/login",
      user
    );

    return result.data;
    // }
    // catch(error: any) {
    //     // console.log("error", error.response.data);
    //     // console.log("error", error.response.status);
    //     // console.log("error", error.response.headers);

    //     if (error.response.status === 401) {

    //     }
    // }
  }
}
