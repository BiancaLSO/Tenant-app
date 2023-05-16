import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TextStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { infoEntity } from "../components/info/infoEntity";
import { fetchAllInfo } from "../components/info/infoSlice";
import { InfoAPI } from "../components/info/infoAPI";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { InfoContext } from "../components/TabNavigation";
import axios from "axios";

export default function Info() {
  const { info, setInfo } = useContext(InfoContext);
  const myIp: string = "192.168.203.85";

  useEffect(() => {
    const fetchInfo = async () => {
      axios
        .get("http://" + myIp + ":3000/infos")
        .then((response) => {
          console.log(response.data);
          setInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    console.log(info);
  }, []);
  return (
    <View>
      <Text>Hello</Text>

      {info.map((item) => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Text>{item.info}</Text>
        </View>
      ))}
    </View>
  );
}
