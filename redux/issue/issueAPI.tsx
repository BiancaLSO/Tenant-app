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

  static async createIssue(
    issue: IssueEntity,
    userId: number | undefined,
    categoryId: number | undefined
  ) {
    if (
      userId !== undefined &&
      categoryId !== undefined &&
      typeof userId === "number"
    ) {
      issue.userId = userId;
      issue.categoryId = categoryId;
      const payload = { data: issue };
      const result = await axios.post(
        "http://" + this.myIp + ":3000/issues",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return result.data;
    }
    return;
  }

  static async fetchAllIssues() {
    try {
      const result = await axios.get("http://" + this.myIp + ":3000/issues");

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async fetchUserIssues(userId: number | undefined) {
    try {
      const result = await axios.get(
        "http://" +
          this.myIp +
          `:3000/issues/user/issues/userissues?userId=${userId}`
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  static async fetchSearchedIssues(subject: string) {
    try {
      const result = await axios.get(
        "http://" +
          this.myIp +
          `:3000/issues/search?subject=${encodeURIComponent(subject)}`
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  static async fetchFilteredIssues(category: string) {
    try {
      const result = await axios.get(
        "http://" +
          this.myIp +
          `:3000/issues/filter/filters?category=${encodeURIComponent(category)}`
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
  static async deleteIssue(id: number | undefined) {
    const url = `http://${this.myIp}:3000/issues/${id}`;
    try {
      const result = await axios.delete(url);
      return result.data;
    } catch (error) {
      console.log(`Error deleting issue with ID ${id}:`, error);
      throw error;
    }
  }
}
