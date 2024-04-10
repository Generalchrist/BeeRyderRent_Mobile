import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CarDetailScreen from './src/Screens/Detail/CarDetailScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';
import { CarDetail } from './src/Models/CarDetail';

type RootStackParamList = {
  Home: undefined;
  CarDetailScreen: { car: CarDetail };
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  const options = {
    title: 'BeeRyder Rental',
    headerStyle: {
      backgroundColor: '#1f262e',
    },
    headerTintColor: '#fff',
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen}  options={options} />
        <RootStack.Screen name="CarDetailScreen" component={CarDetailScreen} options={options} />
      </RootStack.Navigator>
    </NavigationContainer>
  );

};

export default App;