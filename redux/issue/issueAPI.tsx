import axios from "axios";
import { Platform } from "react-native";
import { IssueEntity } from "./issueEntity";
import { myIp } from "../../components/consts";
import * as SecureStore from "expo-secure-store";
import { RootState } from "../../store";
import { UsersEntity } from "../users/usersEntity";
import { useSelector } from "react-redux";

export class IssueAPI {
  static myIp: string = myIp;

  static async createIssue(issue: IssueEntity, userId: number | undefined) {
    console.log("from api", userId);

    if (userId !== undefined && typeof userId === "number") {
      const payload = { userId, issue }; // Pass userId directly in the payload
      const result = await axios.post("http://" + this.myIp + ":3000/issues", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return result.data;
    }
    return;
  }

  static async fetchAllIssues() {
    try {
      const result = await axios.get("http://" + this.myIp + ":3000/issues");
      console.log("result issues" + result);

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async fetchUserIssues(userId: number) {
    try {
      const result = await axios.get("http://" + this.myIp + `:3000/issues/user/issues/userissues?userId=${userId}`);
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
