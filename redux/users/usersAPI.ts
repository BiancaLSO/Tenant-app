import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "../users/usersEntity";
import { SignUpUser } from "./signupuserEntity";

export class UsersAPI {
  static baseUrl: string = Platform.OS === "ios" ? "localhost" : "10.182.2.24";
  static ip: string = "10.182.2.24";

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

  static async fetchUserData(id: number | null, token: string | null) {
    const url = `http://` + this.ip + `:3000/users/${id}`;
    try {
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data;
    } catch (error) {
      console.log("This error is from the UsersAPI " + error);
    }
  }
}
