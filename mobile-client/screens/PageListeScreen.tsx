import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePageQuery } from '../gql/generated/schema';

export default function PageListe() {

 const { data, loading, error } = usePageQuery();
 const pages = data?.Page || [];
 
  return (
    <View style={styles.container}>
      <Text>Pages</Text>
      <FlatList
        data={pages}
        renderItem={({item}) => <Text>{item.url}</Text>}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});