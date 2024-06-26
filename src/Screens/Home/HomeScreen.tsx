import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image, SearchBar, Skeleton } from '@rneui/themed';

import { CarDetail } from '../../Models/CarDetail';
import { getAllCarDetails } from '../../Services/carService';
import CarCard from '../../Components/CarCard';
import { Text } from '@rneui/base';


const HomeScreen = () => {
  let [cars, setCars] = useState<CarDetail[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCars(search);
  }, [search]);

  const fetchCars = async (search: any) => {
    try {
      if (search === "") {
        const response = await getAllCarDetails();
        setCars(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateSearch = (search: any) => {
    setSearch(search);
    cars = cars.filter((car) => {
      return car.brandName.toLowerCase().includes(search.toLowerCase());
    });
    setCars(cars);
  };


  return (
    <ScrollView style={styles.container}>
      {/* Image header */}
      <Image
        source={{ uri: 'https://i.imgur.com/6leloar.jpeg' }}
        style={styles.headerImage}
      />

      {/* Search bar */}
      <SearchBar
        placeholder="Search"
        round={true}
        onChangeText={updateSearch}
        value={search}
        inputMode='text'
        containerStyle={styles.searchBarContainer}
        platform='default'
      />

      {/* Car cards */}
      <View>
        {cars.length === 0 ? (
          <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
            <Skeleton style={styles.skeleton} />
            <Skeleton style={styles.skeleton} />
            <Skeleton style={styles.skeleton} />
          </View>
        ) : (
          cars.map((car, index) => (
            <CarCard key={index} car={car} index={index} />
          ))
        )}
      </View>
    </ScrollView >
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
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  skeleton: {
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#334754',
    borderWidth: 1,
    borderBlockColor: '#334754',
    height: 350,
    opacity: 0.1,
  },
});

export default HomeScreen;
