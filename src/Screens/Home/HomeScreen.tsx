import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, SearchBar } from 'react-native-elements';
import { CarDetail } from '../../Models/CarDetail';
import { getAllCarDetails } from '../../Services/carService';
import { Image } from 'react-native-elements/dist/image/Image';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [cars, setCars] = useState<CarDetail[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await getAllCarDetails();
      setCars(response);
    } catch (error) {
      console.log(error);
    }
  };


  const handleViewDetails = (car: CarDetail) => {
    navigation.navigate('CarDetailScreen', { car });
  };


  return (
    <ScrollView style={styles.container}>
      {/* Image header */}
      <Image
        source={require('../../../assets/vettelim.jpg')}
        style={styles.headerImage}
      />

      {/* Search bar */}
      <SearchBar
        placeholder="Search"
        round
        autoCorrect={false}
        inputMode='text'
        containerStyle={styles.searchBarContainer}
      />

      {/* Car cards */}
      <View>
        {cars.map((car, index) => (
          <Card key={index} containerStyle={styles.card}>
            <Card.Image source={{ uri: "http://10.0.2.2:5000/" + car.images[0].imagePath }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>
              {car.brandName} {car.modelYear} {car.model}
            </Text>
            <Text style={{ color: '#fff' }}>
              ${car.dailyPrice}
            </Text>
            <Text style={{ color: '#fff', marginBottom: 10 }}>
              {car.description}
            </Text>

            <Button
              title="Details"
              buttonStyle={styles.button}
              onPress={() => handleViewDetails(car)}
            />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f262e',

  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  searchBarContainer: {
    marginTop: -20,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#334754',
    backgroundColor: '#1f262e',
  },
  cardTitle: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'space-between',
  },
  cardImage: {
    borderRadius: 10,
    height: 200,
  },
  button: {
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#1c272e',
    borderColor: '#324654',
    borderWidth: 1,
  },
});

export default HomeScreen;
