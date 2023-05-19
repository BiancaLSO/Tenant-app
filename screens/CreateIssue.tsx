import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TextStyle, TouchableOpacity, Dimensions, FlatList, Button, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { infoEntity } from "../redux/info/infoEntity";
import { fetchAllInfo } from "../redux/info/infoSlice";
import { CategoryEntity } from "../redux/category/categoryEntity";
import { getCategoryData } from "../components/categoryData";
import { Picture } from "../components/Picture";
import { createIssue } from "../redux/issue/issueSlice";
import { IssueEntity } from "../redux/issue/issueEntity";

interface ChipProps {
  label: string;
  onPress: () => void;
  selected: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onPress, selected }) => (
  <TouchableOpacity style={[styles.chip, selected && styles.selectedChip]} onPress={onPress}>
    <Text style={[styles.labelChip, selected && styles.selectedLabelChip]}>{label}</Text>
  </TouchableOpacity>
);

export default function CreateIssue() {
  const dispatch = useDispatch<AppDispatch>();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const selectedCategory: CategoryEntity | null = useSelector((state: RootState) => state.category.selectedCategory);

  const scrollViewRef = useRef<ScrollView>(null);
  const [camera, setCamera] = useState(false);
  const [photoToDisplay, setPhotoToDisplay] = useState("");

  const data: string[] = selectedCategory ? getCategoryData(selectedCategory.name) : [];

  const handleChipPress = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((selectedChip) => selectedChip !== chip));
    } else {
      setSelectedChips([chip]);
      setSubject(chip);
    }
  };
  const handleOpenCamera = (boolean: boolean) => {
    setCamera(boolean);
    if (boolean === true) {
      scrollViewRef.current?.scrollTo({ y: 2000, animated: true });
    } else {
      scrollViewRef.current?.scrollTo({ y: 10, animated: true });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await dispatch(createIssue(new IssueEntity(subject, description, photoToDisplay)));

    if (response) {
      setImageUrl(response.payload.imageUrl);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView ref={scrollViewRef}>
        <View style={[styles.header, styles.container]}>
          <Text style={styles.h1}>Create your issue</Text>
          <View style={styles.catLabel}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>{selectedCategory?.name}</Text>
          </View>
          <Text style={styles.text}>Tell us what is wrong. Once you have created the case, it will be sent and you will be contacted through email as soon as possible.</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subject</Text>
            <TextInput placeholder="Insert the subject" style={styles.input} onChangeText={setSubject} value={subject} />
            <FlatList data={data} keyExtractor={(item) => item} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item }) => <Chip label={item} onPress={() => handleChipPress(item)} selected={selectedChips.includes(item)} />} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>

            <TextInput style={styles.textArea} multiline numberOfLines={6} placeholder="Describe your issue as detailed as possible." value={description} onChangeText={setDescription} />
          </View>
          <View style={[styles.cameraContainer, { height: camera ? 650 : 100 }]}>
            {camera ? (
              <TouchableOpacity onPress={() => handleOpenCamera(false)} style={styles.button}>
                <Text style={{ color: "black", textAlign: "center", fontSize: 15 }}>Hide camera</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleOpenCamera(true)} style={styles.button}>
                <Text style={{ color: "black", textAlign: "center", fontSize: 15 }}>Open camera</Text>
              </TouchableOpacity>
            )}
            {camera ? <Picture setCamera={setCamera} setPhotoToDisplay={setPhotoToDisplay}></Picture> : <></>}
          </View>
          {photoToDisplay && imageUrl ? <Image source={{ uri: imageUrl }} style={styles.uploadedImage} /> : null}
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 15 }}>Create issue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    marginHorizontal: 25,
    paddingBottom: 50,
  },
  header: {
    paddingVertical: 20,
  },
  h1: {
    color: "#0B1F2F",
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 15,
  },
  h2: {
    color: "#0B1F2F",
    fontSize: 25,
    fontWeight: "500",
    marginTop: 15,
  },
  text: {
    color: "#0B1F2F",
    fontSize: 17,
  },
  catLabel: {
    color: "#0B1F2F",
    fontWeight: "700",
    backgroundColor: "#A5ED7B",
    width: "45%",
    padding: 8,
    marginVertical: 10,
    borderRadius: 10,
  },
  tabsHeader: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0B1F2F",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabButton: {
    padding: 15,
  },
  tabButtonSelected: {
    borderBottomWidth: 5,
    borderBottomColor: "#A5ED7B",
  },
  categoryItem: {
    backgroundColor: "#F2F4F7",
    margin: 5,
    flexBasis: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  categoryButton: {
    color: "#0B1F2F",
    fontSize: 20,
    fontWeight: "500",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#101828",
    marginBottom: 10,
  },
  input: {
    width: screen.width - 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  chip: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedChip: {
    backgroundColor: "#A5ED7B",
  },
  labelChip: {
    fontSize: 14,
    color: "#333",
  },
  selectedLabelChip: {
    color: "#0B1F2F",
  },
  cameraContainer: {
    flex: 1,
    marginBottom: 50,
    height: 650,
  },
  button: {
    color: "#0B1F2F",
    backgroundColor: "#A5ED7B",
    width: "40%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
});
