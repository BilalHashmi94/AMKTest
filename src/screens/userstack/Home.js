import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  AppFont,
  Colors,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '../../redux/Actions';
import Config from 'react-native-config';

const BASE_URL = Config.API_BASE_URL;
const API_KEY = Config.API_KEY;

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [visited, setVisited] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radiusValue, setRadiusValue] = useState(50);
  const rVisited = useSelector(state => state.AuthReducer.list);
  const kmToMeters = km => km * 1000;
  const dispatch = useDispatch();

  useEffect(() => {
    requestLocationPermission();
  }, [radiusValue]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchPlaces();
      } else {
        console.warn('Location permission denied');
        setLoading(false);
      }
    } else {
      fetchPlaces();
    }
  };

  const fetchPlaces = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const url = `${BASE_URL}0.1/en/places/radius?radius=${kmToMeters(
            radiusValue,
          )}&lon=${longitude}&lat=${latitude}&kinds=historic&format=json&apikey=${API_KEY}`;
          const response = await fetch(url);
          const data = await response.json();

          const limitedData = data.slice(0, 36);

          let allPlaces = [];

          const fetchBatch = async (batch, batchIndex) => {
            const detailsPromises = batch.map(async (item, index) => {
              try {
                const detailsUrl = `${BASE_URL}0.1/en/places/xid/${item.xid}?apikey=${API_KEY}`;
                const detailsResp = await fetch(detailsUrl);
                const details = await detailsResp.json();

                return {
                  id: item.xid || `${batchIndex}-${index}`,
                  name: details.name || 'Unknown Place',
                  description:
                    details.wikipedia_extracts?.text ||
                    details.info?.descr ||
                    'No description available',
                  image: details.preview?.source || 'placeholder',
                };
              } catch (err) {
                console.error('Details fetch error', err);
                return {
                  id: item.xid || `${batchIndex}-${index}`,
                  name: item.name || 'Unknown Place',
                  description: 'No description available',
                  image: 'placeholder',
                };
              }
            });

            return await Promise.all(detailsPromises);
          };

          for (let i = 0; i < limitedData.length; i += 9) {
            const batch = limitedData.slice(i, i + 9);
            const batchDetails = await fetchBatch(batch, i / 9);

            allPlaces = [...allPlaces, ...batchDetails];
            setPlaces([...allPlaces]);

            if (i + 9 < limitedData.length) {
              await new Promise(res => setTimeout(res, 2000));
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      error => {
        console.error(error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const toggleVisited = (id, item) => {
    setVisited(prev =>
      prev.includes(id)
        ? prev.filter(placeId => placeId !== id)
        : [...prev, id],
    );
    const exists = rVisited.some(v => v.id === id);

    if (exists) {
      dispatch(AuthAction.Visited(rVisited.filter(v => v.id !== id)));
    } else {
      dispatch(AuthAction.Visited([...rVisited, item]));
    }
  };

  const renderPlace = ({ item }) => {
    const isVisited = rVisited
      ? rVisited.some(obj => obj.id === item.id)
      : false;

    return (
      <TouchableOpacity
        onPress={() =>
          NavigationService.navigate('PlaceDetail', {
            place: item,
          })
        }
        style={styles.card}
      >
        <Image
          source={
            item.image.includes('placeholder')
              ? Images.noimage
              : { uri: item.image }
          }
          style={styles.image}
        />
        <View style={{ padding: Metrix.HorizontalSize(15) }}>
          <Text style={styles.placeName}>{item.name}</Text>
          <Text style={styles.placeDesc} numberOfLines={2}>
            {item.description}
          </Text>
          <TouchableOpacity
            style={[
              styles.visitedButton,
              { backgroundColor: isVisited ? Colors.primary : Colors.white },
            ]}
            onPress={() => toggleVisited(item.id, item)}
          >
            <Text
              style={[
                styles.visitedText,
                { color: isVisited ? Colors.white : Colors.primary },
              ]}
            >
              {isVisited ? 'Visited' : 'Mark as Visited'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.row, marginVertical: Metrix.VerticalSize(20) }}>
        <View style={{ width: '90%' }}>
          <Text style={styles.title}>
            Discover & Find{' '}
            <Text style={styles.titlePrimary}>
              Your Next Historical Destination
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={fetchPlaces}>
          <FontAwesome name={'refresh'} size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: Metrix.VerticalSize(20) }}>
        <Text style={{ ...styles.placeName, color: Colors.primary }}>
          Radius:{' '}
          <Text style={{ ...styles.placeName }}>
            {radiusValue.toFixed(0)} KM
          </Text>
        </Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={10}
          maximumValue={100}
          disabled={loading}
          step={10}
          value={radiusValue}
          onValueChange={setRadiusValue}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={Colors.primaryDark}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ flex: 1 }}
        />
      ) : (
        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={renderPlace}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(20),
    color: Colors.titleFont,
  },
  titlePrimary: {
    fontFamily: AppFont.LexendBlack,
    fontSize: Metrix.customFontSize(20),
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    width: '100%',
    height: Metrix.VerticalSize(180),
  },
  placeName: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(18),
    color: Colors.titleFont,
    marginBottom: 5,
  },
  placeDesc: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(14),
    color: Colors.subText,
    marginBottom: 12,
  },
  visitedButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignSelf: 'flex-start',
  },
  visitedText: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(14),
  },
});

export default Home;
