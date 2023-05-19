import axios from "axios";
import { Platform } from "react-native";
import { IssueEntity } from "./issueEntity";
import { myIp } from "../../components/consts";

export class IssueAPI {
  static myIp: string = myIp;

  static async createIssue(issue: IssueEntity) {
    try {
      console.log("sending data", issue);

      const result = await axios.post("http://" + this.myIp + ":3000/issues", { data: issue, headers: { "Content-Type": "multipart/form-data" } });
      return result.data;
    } catch (error) {}
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
