import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePageQuery } from "../gql/generated/schema";
import PageCard from "../components/PageCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PageListe() {
  const { data, loading, error } = usePageQuery();
  const pages = data?.Page || [];

  return (
    <SafeAreaView >
      <View >
        <FlatList
          data={pages}
          renderItem={({ item }) => <PageCard page={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
