import HomeScreen from './src/Screens/Home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CarDetailScreen from './src/Screens/Detail/CarDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  const options = {
    title: 'BeeRyder Rental',
    headerStyle: {
      backgroundColor: '#1f262e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={options} />
        <Stack.Screen name="CarDetailScreen" component={CarDetailScreen} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;