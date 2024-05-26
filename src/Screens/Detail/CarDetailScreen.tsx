import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDetail } from '../../Models/CarDetail';
import { Image } from '@rneui/themed';
import { MACHINE_URL } from '../../Services/Helpers/axiosConfig';
import { Button, Card } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Rental } from '../../Models/Rental';
import { parseToken } from '../../Services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRental } from '../../Services/rentalService';


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
    const [showRentDatePicker, setShowRentDatePicker] = useState(false);
    const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
    const [rentDate, setRentDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());


    const handleRentDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || rentDate;
        setShowRentDatePicker(false);
        setRentDate(currentDate);
    };

    const handleReturnDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || returnDate;
        setShowReturnDatePicker(false);
        setReturnDate(currentDate);
    };

    const handleRent = async () => {
        if (rentDate >= returnDate) {
            Alert.alert('Wrong Date', 'Return date must be greater than rent date');
            return;
        }
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                const parsedToken = parseToken(value);
                if (parsedToken) {
                    const rentalModel: Rental = {
                        carId: car.carId,
                        customerId: parsedToken.userId,
                        rentDate: rentDate,
                        returnDate: returnDate
                    }

                    postRental(rentalModel).then((response) => {
                        if (response.success) {
                            Alert.alert('Rent Successful', `You rented ${car.modelYear} ${car.brandName} ${car.model} from ${rentDate.toDateString()} to ${returnDate.toDateString()}`);
                        } else {
                            Alert.alert('Rent Failed', 'Something went wrong');
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }
        } catch (e) {
            console.error(e);
            Alert.alert('Rent Failed', 'Something went wrong');
        }




    };

    const renderDateTimePicker = (isVisible: boolean, date: Date, onChange: any) => {
        if (isVisible) {
            return (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            );
        }
        return null;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ margin: 10 }}>
                <Image source={{ uri: MACHINE_URL + car.images[0].imagePath }} style={styles.image} />
                <Card containerStyle={styles.card}>
                    <Image source={{ uri: "https://i.imgur.com/J0jhdl3.png" }} style={styles.logo} />
                    <Text style={styles.title}>{car.modelYear} {car.brandName} {car.model}</Text>
                    <Text style={styles.text}>Brand: {car.brandName}</Text>
                    <Text style={styles.text}>Color: {car.colorName}</Text>
                    <Text style={styles.text}>Model Year: {car.modelYear}</Text>
                    <Text style={styles.text}>Model: {car.model}</Text>
                    <Text style={styles.text}>Daily Price: ${car.dailyPrice}</Text>
                    <Text style={styles.text}>Description: {car.description}</Text>
                </Card>
                <Card containerStyle={styles.card}>
                    <View style={{ alignItems: "center" }}>
                        <Button title="Select Rent Date" onPress={() => setShowRentDatePicker(true)} buttonStyle={styles.button} />
                        {renderDateTimePicker(showRentDatePicker, rentDate, handleRentDateChange)}
                        <Button title="Select Return Date" onPress={() => setShowReturnDatePicker(true)} buttonStyle={styles.button} />
                        {renderDateTimePicker(showReturnDatePicker, returnDate, handleReturnDateChange)}
                        <Button title="Rent" onPress={() => handleRent()} buttonStyle={{ ...styles.button, width: '100%' }} />
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
        marginVertical: 10,
    },
});


export default CarDetailScreen;






