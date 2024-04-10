import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDetail } from '../../Models/CarDetail';
import { Image } from '@rneui/themed';
import { MACHINE_URL } from '../../Services/Helpers/axiosConfig';
import { Button, Card } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';

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

    const navigation = useNavigation<any>();

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ margin: 10 }}>
                <Image source={{ uri: MACHINE_URL + car.images[0].imagePath }} style={styles.image} />
                <Card containerStyle={styles.card}>
                    <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                    <Text style={styles.title}>{car.modelYear} {car.brandName} {car.model}</Text>
                    <Text style={styles.text}>Brand: {car.brandName}</Text>
                    <Text style={styles.text}>Color: {car.colorName}</Text>
                    <Text style={styles.text}>Model Year: {car.modelYear}</Text>
                    <Text style={styles.text}>Model: {car.model}</Text>
                    <Text style={styles.text}>Daily Price: ${car.dailyPrice}</Text>
                    <Text style={styles.text}>Description: {car.description}</Text>
                </Card>
                <Card containerStyle={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title="Rent" onPress={() => console.log('Rent')} buttonStyle={styles.button} />
                        <Button title="Keep Browsing" onPress={handleGoBack} buttonStyle={styles.button} />
                    </View>

                </Card>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f262e',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    logo: {
        width: '50%',
        height: 100,
        borderRadius: 10,
        marginHorizontal: '25%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 10,
        textAlign: 'center',
    },
    text: {
        color: '#fff',
        marginVertical: 10,
        alignSelf: 'baseline',
    },
    card: {
        backgroundColor: '#1f262e',
        borderColor: '#334754',
        borderWidth: 1,
        borderRadius: 10,
    },
    button: {
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#1c272e',
        borderColor: '#324654',
        borderWidth: 1,
        paddingHorizontal: 20,
    },
});

export default CarDetailScreen;
