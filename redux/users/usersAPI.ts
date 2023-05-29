import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "../users/usersEntity";
import { SignUpUser } from "./signupuserEntity";
import { myIp } from "../../components/consts";

export class UsersAPI {
  static baseUrl: string = Platform.OS === "ios" ? "localhost" : myIp;
  static ip: string = myIp;

  static async signupTenant(user: SignUpUser) {
    try {
      const result = await axios.post(
        "http://" + this.ip + ":3000/auth/signuptenant",
        user
      );
      console.log("back from server", result.data);

      return result.data;
    } catch (error: any) {
      const errorResponse = error.response.data;
      const errorMessage =
        errorResponse.message || "Sign-up failed. Please try again.";
      throw new Error(errorMessage);
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
    } catch (error: any) {
      const errorResponse = `bulshit ${error.response.data}`;
      const errorMessage = errorResponse || "Sign-up failed. Please try again.";
      throw new Error(errorMessage);
    }
  }

  static async login(user: UsersEntity) {
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

  static async fetchApartmentData(
    id: number | undefined,
    token: string | null
  ) {
    const url = `http://` + this.ip + `:3000/apartment-info/${id}`;
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

  static async updateUser(
    id: number | null,
    updatedUser: UsersEntity,
    token: string | null
  ) {
    const url = `http://` + this.ip + `:3000/users/${id}`;
    try {
      const result = await axios.put(url, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data;
    } catch (error) {
      console.log("This error is from the UsersAPI updateUser " + error);
    }
  }

  static async deleteUser(id: number | null) {
    const url = `http://` + this.ip + `:3000/users/${id}`;
    try {
      const result = await axios.delete(url);
      console.log("This is the result.data from userApi ", result.data);
      return result.data;
    } catch (error) {
      console.log("This error is from the UsersAPI deleteUser " + error);
    }
  }
}
