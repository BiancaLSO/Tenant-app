import axios from "axios";
import { Platform } from "react-native";
import { IssueEntity } from "./issueEntity";
import { myIp } from "../../components/consts";

export class IssueAPI {
  static myIp: string = myIp;

  //   in case we decide to be able to create info
  //   static async create(info: infoEntity) {
  //     try {
  //       console.log("receiving info", info);

  //       const result = await axios.post("http://" + this.myIp + ":3000/infos", { data: info, headers: { "Content-Type": "multipart/form-data" } });
  //       return result.data;
  //     } catch (error) {}
  //   }

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
