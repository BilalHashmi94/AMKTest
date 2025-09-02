import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { AppFont, Colors, Metrix, Images } from '../../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthAction } from '../../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';

const PlaceDetail = ({ route, navigation }) => {
  const { place } = route.params;
  const rVisited = useSelector(state => state.AuthReducer.list);
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    setVisited(rVisited.some(obj => obj?.id === place?.id));
  }, [rVisited, place.id]);

  const dispatch = useDispatch();

  const toggleVisited = () => {
    if (visited) {
      dispatch(AuthAction.Visited(rVisited.filter(v => v.id !== place.id)));
    } else {
      dispatch(AuthAction.Visited([...rVisited, place]));
    }
    setVisited(!visited);
  };

  const gallery = [
    { id: '1', image: 'https://picsum.photos/200/300?random=1' },
    { id: '2', image: 'https://picsum.photos/200/300?random=2' },
    { id: '3', image: 'https://picsum.photos/200/300?random=3' },
    { id: '4', image: 'https://picsum.photos/200/300?random=4' },
    { id: '5', image: 'https://picsum.photos/200/300?random=5' },
    { id: '6', image: 'https://picsum.photos/200/300?random=6' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={
            place.image?.includes('placeholder')
              ? Images.noimage
              : { uri: place.image }
          }
          style={styles.headerImage}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '60%' }}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.location}>
              <FontAwesome name="map-marker" size={14} color={Colors.primary} />{' '}
              {place.country || 'Unknown Location'}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.visitedButton,
              { backgroundColor: visited ? Colors.primary : Colors.white },
            ]}
            onPress={() => toggleVisited()}
          >
            <Text
              style={[
                styles.visitedText,
                { color: visited ? Colors.white : Colors.primary },
              ]}
            >
              {visited ? 'Visited' : 'Mark as Visited'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {place.description || 'No description available for this place.'}
        </Text>

        <Text style={styles.sectionTitle}>Tags</Text>
        <View style={styles.tagsContainer}>
          {['Historic', 'Culture', 'Travel'].map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Gallery</Text>
        <FlatList
          data={gallery}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.image }} style={styles.galleryImage} />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { position: 'relative' },
  headerImage: {
    width: '100%',
    height: Metrix.VerticalSize(250),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 30,
  },
  infoContainer: {
    padding: Metrix.HorizontalSize(20),
  },
  placeName: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(22),
    color: Colors.titleFont,
  },
  location: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(14),
    color: Colors.subText,
    marginVertical: 5,
  },
  sectionTitle: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(16),
    color: Colors.primary,
    marginTop: 15,
    marginBottom: 8,
  },
  description: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(14),
    color: Colors.subText,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.primaryDark,
  },
  galleryImage: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(100),
    borderRadius: 12,
    margin: 5,
  },
  visitedButton: {
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignSelf: 'flex-start',
  },
  visitedText: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(11),
  },
});

export default PlaceDetail;
