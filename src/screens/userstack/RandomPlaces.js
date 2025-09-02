import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppFont,
  Colors,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import Swiper from 'react-native-deck-swiper';
import MatchModal from '../../components/MatchModal';
import { ButtonComp } from '../../components';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';

const BASE_URL = Config.API_BASE_URL;
const API_KEY = Config.API_KEY;

const RandomPlaces = () => {
  const [thatsall, setThatsAll] = useState(false);
  const swiperRef = useRef(null);
  const [showMatch, setShowMatch] = useState(false);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [randomStopIndex, setRandomStopIndex] = useState(null);

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchPlaces();
    });
  }, []);

  const fetchPlaces = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const url = `${BASE_URL}0.1/en/places/radius?radius=${1000}&lon=${longitude}&lat=${latitude}&kinds=historic&format=json&apikey=${API_KEY}`;
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

  const onRandomStart = () => {
    if (places.length > 0 && swiperRef?.current) {
      const randomStop = Math.floor(Math.random() * places.length) + 1;
      setRandomStopIndex(randomStop);

      let count = 0;
      let directionRight = true;

      const interval = setInterval(() => {
        if (!swiperRef.current) {
          clearInterval(interval);
          return;
        }

        if (directionRight) {
          swiperRef.current.swipeRight();
        } else {
          swiperRef.current.swipeLeft();
        }

        directionRight = !directionRight;
        count++;

        if (count >= randomStop) {
          clearInterval(interval);
        }
      }, 500);
    }
  };

  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.row, marginVertical: Metrix.VerticalSize(20) }}>
        <View>
          <Text style={styles.title}>
            Explore the World{' '}
            <Text style={styles.titlePrimary}>with Random Adventures</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.text}>
        Hit Start and let fate pick your next historical spot to visit.
      </Text>
      <View>
        {!loading ? (
          <Swiper
            ref={swiperRef}
            cards={places}
            disableBottomSwipe
            disableLeftSwipe
            disableRightSwipe
            disableTopSwipe
            renderCard={card => {
              return (
                <View style={styles.card}>
                  <View>
                    <Image
                      source={
                        card?.image.includes('placeholder')
                          ? Images.noimage
                          : { uri: card?.image }
                      }
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'stretch',
                        borderRadius: 23,
                      }}
                    />
                    <View
                      style={{
                        bottom: 0,
                        with: '100%',
                        backgroundColor: 'rgba(128, 128, 128, 0.5)',
                        position: 'absolute',
                        width: '100%',
                        zIndex: 8,
                        paddingVertical: Metrix.VerticalSize(10),
                        paddingHorizontal: Metrix.HorizontalSize(20),
                        marginBottom: Metrix.VerticalSize(30),
                      }}
                    >
                      <Text style={{ ...styles.placeName }}>{card?.name}</Text>
                      <Text style={{ ...styles.placeDesc }} numberOfLines={2}>
                        {card?.description}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      zIndex: 9,
                    }}
                  >
                    <ButtonComp title="Start" onPress={() => onRandomStart()} />
                  </View>
                </View>
              );
            }}
            onSwiped={cardIndex => {
              if (cardIndex + 1 === randomStopIndex) {
                setShowMatch(true);
              }
            }}
            onSwipedAll={() => {
              setThatsAll(true);
            }}
            cardIndex={0}
            backgroundColor={Colors.background}
            stackSize={3}
          ></Swiper>
        ) : null}
        {loading ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size={'large'} color={Colors.primary} />
          </View>
        ) : null}
      </View>
      <MatchModal
        visible={showMatch}
        onClose={() => setShowMatch(false)}
        matchedImage={places[randomStopIndex]?.image}
        data={places[randomStopIndex]}
        onViewDetails={() => {
          fetchPlaces();
          setShowMatch(false);
          NavigationService.navigate('PlaceDetail', {
            place: places[randomStopIndex],
          });
        }}
        onKeepSwiping={() => {
          fetchPlaces();
          setShowMatch(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  placeName: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.titleFont,
    marginBottom: 5,
  },
  placeDesc: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.titleFont,
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
  text: {
    fontFamily: AppFont.GilroySemiBoldItalic,
    fontSize: Metrix.customFontSize(14),
    color: Colors.gray700,
  },
  card: {
    // height: Metrix.VerticalSize(483),
    width: '90%',
    height: Dimensions.get('screen').height / 2,
    // width: Metrix.HorizontalSize(280),
    backgroundColor: Colors.primary,
    borderRadius: 23,
  },
  likeContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: -35,
    width: '75%',
    // height: 70,
    alignSelf: 'center',
    borderRadius: 35,
    shadowColor: '#752277',
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: '#fff',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  likeButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
  },
  shadow: {
    shadowColor: '#752277',
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default RandomPlaces;
