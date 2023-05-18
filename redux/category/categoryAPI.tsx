import axios from "axios";
import { Platform } from "react-native";
import { CategoryEntity } from "./categoryEntity";
import { myIp } from "../../components/consts";

export class CategoryAPI {
  static myIp: string = myIp;

  static async fetchAllCategories() {
    try {
      const result = await axios.get("http://" + this.myIp + ":3000/categories");
      console.log("result categories" + result);

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
