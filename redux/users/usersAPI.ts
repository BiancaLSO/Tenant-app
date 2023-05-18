import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "../users/usersEntity";
import { SignUpUser } from "./signupuserEntity";
import { myIp } from "../../components/consts";

export class UsersAPI {
  static baseUrl: string = Platform.OS === "ios" ? "localhost" : myIp;
  static ip: string = myIp;

  static async signup(user: SignUpUser) {
    try {
      const result = await axios.post("http://" + this.ip + ":3000/auth/signuptenant", user);
      console.log("back from server", result.data);

      return result.data;
    } catch (error) {
      console.log("nope");
    }
  }

  static async login(user: UsersEntity) {
    // try {
    const result = await axios.post("http://" + this.ip + ":3000/auth/login", user);

    return result.data;
  }
}
