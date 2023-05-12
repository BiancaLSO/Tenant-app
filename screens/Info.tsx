import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TextStyle } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { infoEntity } from "../components/info/infoEntity";

export default function Info() {
  const info = useSelector((state: RootState) => state.info.info);
  return (
    <View>
      {info.map((item) => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Text>{item.info}</Text>
        </View>
      ))}
    </View>
  );
}
