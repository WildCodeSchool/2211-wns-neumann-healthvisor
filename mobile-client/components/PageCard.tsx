import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Page } from "../gql/generated/schema";

interface Props {
  page: Page;
}

const PageCard = ({ page }: Props) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text>{page.url}</Text>
      <Text>{page.intervale}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxHeight: 50,
    // marginHorizontal: 10,
    backgroundColor: "#009BE5",
  },
});
export default PageCard;
