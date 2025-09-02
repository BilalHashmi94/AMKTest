import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import {
  AppFont,
  Colors,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import { ButtonComp } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GetStarted = () => {
  return (
    <View style={{ ...styles.container }}>
      <Image
        source={Images.fixitlogo}
        style={{
          resizeMode: 'cover',
          width: Metrix.HorizontalSize(250),
          height: Metrix.VerticalSize(76),
          marginBottom: Metrix.VerticalSize(50),
        }}
      />
      <Image
        source={Images.Group}
        style={{
          resizeMode: 'contain',
          width: Metrix.HorizontalSize(273),
          height: Metrix.VerticalSize(268),
          marginBottom: Metrix.VerticalSize(35),
        }}
      />
      <Text
        style={{
          fontFamily: AppFont.LexendSemiBold,
          fontSize: Metrix.customFontSize(25),
          color: Colors.titleFont,
          textAlign: 'center',
          marginBottom: Metrix.VerticalSize(55),
        }}
      >
        New Places, Unforgettable Memories.
      </Text>
      <ButtonComp
        onPress={() => NavigationService.navigate('UserStack')}
        title="Explore Now"
        Icon={() => {
          return (
            <View
              style={{
                height: Metrix.VerticalSize(35),
                width: Metrix.HorizontalSize(35),
                borderRadius: 35 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5,
              }}
            >
              <Ionicons name={'earth'} color={Colors.white} size={32} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Metrix.HorizontalSize(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GetStarted;
