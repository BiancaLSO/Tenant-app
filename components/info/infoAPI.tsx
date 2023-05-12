import axios from "axios";
import { Platform } from "react-native";
import { infoEntity } from "./infoEntity";

export class InfoAPI {
  static myIp: string = "10.50.130.29";

  //   in case we decide to be able to create info
  //   static async create(info: infoEntity) {
  //     try {
  //       console.log("receiving info", info);

  //       const result = await axios.post("http://" + this.myIp + ":3000/infos", { data: info, headers: { "Content-Type": "multipart/form-data" } });
  //       return result.data;
  //     } catch (error) {}
  //   }

  static async fetchAllInfo() {
    try {
      const result = await axios.get("http://" + this.myIp + ":3000/infos");
      console.log(result);

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
