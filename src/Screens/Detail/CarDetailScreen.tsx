import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDetail } from '../../Models/CarDetail';
import { Image } from 'react-native-elements';

type CarDetailParamList = {
    CarDetailScreen: { car: CarDetail };
};

type CarDetailScreenRouteProp = RouteProp<CarDetailParamList, 'CarDetailScreen'>;

type CarDetailScreenNavigationProp = StackNavigationProp<CarDetailParamList, 'CarDetailScreen'>;

type Props = {
    route: CarDetailScreenRouteProp;
    navigation: CarDetailScreenNavigationProp;
};

const CarDetailScreen: React.FC<Props> = ({ route }) => {
    const { car } = route.params;

    return (
        <View>
            <Image source={{ uri: "http://10.0.2.2:5000/" + car.images[0].imagePath }} />
            <Text>Car Details</Text>
            <Text>{car.model} - {car.modelYear}</Text>
            <Text>{car.brandName}</Text>
            <Text>{car.colorName}</Text>
            <Text>{car.dailyPrice}</Text>
            <Text>{car.description}</Text>
        </View>
    );
};

export default CarDetailScreen;
