import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CarDetailScreen from './src/Screens/Detail/CarDetailScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';
import { CarDetail } from './src/Models/CarDetail';
import { Image } from '@rneui/themed';


type RootStackParamList = {
  Home: undefined;
  CarDetailScreen: { car: CarDetail };
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  const options = {
    headerStyle: {
      backgroundColor: '#1f262e',
      shadowColor: '#334754',
      borderBottomColor: 'transparent',
    },
    headerTintColor: '#fff',
    headerStatusBarColor: '#',
    // FIXME: for adding logo on the headers right side 
    // headerRight: () => (
    //   <Image
    //     source={require('./assets/minilogo.png')}
    //     style={{ width: 50, height: '100%' , marginRight: 10 , resizeMode: 'contain' , borderRadius: 10}}
    //   />
    // ),
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={options}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="CarDetailScreen" component={CarDetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );

};

export default App;