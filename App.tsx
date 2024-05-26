import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CarDetailScreen from './src/Screens/Detail/CarDetailScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';
import { CarDetail } from './src/Models/CarDetail';
import { Image } from '@rneui/themed';
import ProfileScreen from './src/Screens/Profile/ProfileScreen';
import AuthScreen from './src/Screens/Auth/AuthScreen';


type RootStackParamList = {
  Home: undefined;
  CarDetailScreen: { car: CarDetail };
  Profile: undefined;
  Auth: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();


const App = () => {
  const options = ({ navigation }: any) => ({
    headerStyle: {
      backgroundColor: '#1f262e',
      shadowColor: '#334754',
      borderBottomColor: 'transparent',
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <Image
        source={require('./assets/minilogo.png')}
        style={{ width: 40, height: 40, margin: 10, borderRadius: 40, overflow: 'hidden' }}
        onPress={() => navigation.navigate('Profile')}
      />
    ),
  });

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={options}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="CarDetailScreen" component={CarDetailScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="Auth" component={AuthScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );

};

export default App;