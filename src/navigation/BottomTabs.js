import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, Images, Metrix, NavigationService } from '../config';
import { Home, RandomPlaces, VisitedList } from '../screens/userstack';

const Tab = createBottomTabNavigator();

const BottomTabs = props => {
  let icons = ['home', 'random', 'visited'];

  return (
    <>
      <Tab.Navigator
        initialRouteName={'Home'}
        tabBar={props => {
          return (
            <View
              style={{
                height: Metrix.VerticalSize(64),
                paddingHorizontal: Metrix.HorizontalSize(30),
                paddingTop: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.white,
                borderTopWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 20,
                width: '90%',
                borderRadius: 40,
                marginHorizontal: Metrix.HorizontalSize(20),
                ...styles.shadow,
              }}
            >
              {props.state.routes.map((val, index) => (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(val.name);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
                    backgroundColor:
                      props.state.index == index
                        ? Colors.primary
                        : Colors.white,
                  }}
                >
                  {icons[index] === 'home' ? (
                    <Ionicons
                      name={
                        props.state.index == index
                          ? 'home-sharp'
                          : 'home-outline'
                      }
                      size={24}
                      color={
                        props.state.index == index ? Colors.white : Colors.black
                      }
                    />
                  ) : icons[index] === 'random' ? (
                    <Ionicons
                      name={
                        props.state.index == index ? 'dice' : 'dice-outline'
                      }
                      size={24}
                      color={
                        props.state.index == index ? Colors.white : '#4B164C'
                      }
                    />
                  ) : icons[index] === 'visited' ? (
                    <FontAwesome
                      name={props.state.index == index ? 'flag' : 'flag-o'}
                      size={24}
                      color={
                        props.state.index == index ? Colors.white : '#4B164C'
                      }
                    />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        tabBarOptions={{ showLabel: false, keyboardHidesTabBar: true }}
        screenOptions={({ route }) => ({
          headerShown: false,
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          style: {
            borderTopWidth: 0,
            elevation: 0,
            ...styles.shadow,
          },
          keyboardHidesTabBar: true,
          tabBarStyle: {
            height: Metrix.VerticalSize(70),
            paddingHorizontal: Metrix.HorizontalSize(5),
            paddingTop: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          headerShown={false}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={Images.user}
                  style={{
                    resizeMode: 'contain',
                    width: Metrix.HorizontalSize(25),
                    height: Metrix.VerticalSize(25),
                  }}
                />
              </View>
            ),
            tabBarButton: props => <CreateCustomTabButton {...props} />,
          }}
        />
        <Tab.Screen
          name="RandomPlaces"
          component={RandomPlaces}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome
                  name={'search'}
                  size={25}
                  color={focused ? '#CCCCFF' : Colors.black}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="VisitedList"
          component={VisitedList}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome
                  name={'search'}
                  size={25}
                  color={focused ? '#CCCCFF' : Colors.black}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#752277',
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: '#fff',
  },
});

export default BottomTabs;
