// import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationService } from '../config';
import GetStarted from '../screens/auth/GetStarted';
import BottomTabs from './BottomTabs';
import { PlaceDetail } from '../screens/userstack';
import { Linking } from 'react-native';

const Stack = createNativeStackNavigator();
import Config from 'react-native-config';

const BASE_URL = Config.API_BASE_URL;
const API_KEY = Config.API_KEY;

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="GetStarted"
    >
      <Stack.Screen name="GetStarted" component={GetStarted} />
    </Stack.Navigator>
  );
};
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  React.useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeepLink = event => {
    const route = event.url.replace(/.*?:\/\//g, '');
    const [screen, id] = route.split('/');

    if (screen === 'PlaceDetail') {
      fetchBatch(id).then(res => {
        NavigationService.navigate('UserStack', {
          screen: 'PlaceDetail',
          params: { place: res },
        });
      });
    }
  };

  const fetchBatch = async id => {
    try {
      const detailsUrl = `${BASE_URL}0.1/en/places/xid/${id}?apikey=${API_KEY}`;
      const detailsResp = await fetch(detailsUrl);
      const details = await detailsResp.json();

      return {
        id: id,
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
        id: id,
        name: 'Unknown Place',
        description: 'No description available',
        image: 'placeholder',
      };
    }
  };

  return (
    <>
      <NavigationContainer
        ref={ref => NavigationService.setTopLevelNavigator(ref)}
      >
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={'AuthStack'}
        >
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="UserStack" component={UserStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigation;
