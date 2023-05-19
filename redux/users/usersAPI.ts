import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "../users/usersEntity";
import { SignUpUser } from "./signupuserEntity";

export class UsersAPI {
  static baseUrl: string = Platform.OS === "ios" ? "localhost" : "172.20.10.2";
  static ip: string = "172.20.10.2";

  static async signupTenant(user: SignUpUser) {
    try {
      const result = await axios.post(
        "http://" + this.ip + ":3000/auth/signuptenant",
        user
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      console.log("nope");
    }
  }

  static async signupBoard(user: SignUpUser) {
    try {
      const result = await axios.post(
        "http://" + this.ip + ":3000/auth/signupboardmember",
        user
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      console.log("nope");
    }
  }

  static async login(user: UsersEntity) {
    // try {
    const result = await axios.post(
      "http://" + this.ip + ":3000/auth/login",
      user
    );

    return result.data;
  }
}
