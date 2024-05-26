import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { parseToken } from '../../Services/authService';
import { UserModel } from '../../Models/userModel';
import { CarDetail } from '../../Models/CarDetail';
import { getAllCarDetailsByUserId } from '../../Services/rentalService';
import { RentalDetail } from '../../Models/RentalDetail';
import { MACHINE_URL } from '../../Services/Helpers/axiosConfig';
import { Button } from '@rneui/base';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const [userData, setUserData] = useState<UserModel>({
        id: 0,
        email: '',
        fullName: '',
    });
    const [rentedCars, setRentedCars] = useState<RentalDetail[]>([]);

    useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    const parsedToken = parseToken(value);
                    if (parsedToken) {
                        setUserData({
                            id: parsedToken.userId,
                            email: parsedToken.email,
                            fullName: parsedToken.fullName,
                        });
                        fetchRentedCars(parsedToken.userId);
                    } else {
                        navigation.navigate('Auth');
                    }
                } else {
                    navigation.navigate('Auth');
                }
            } catch (e) {
                console.error(e);
                navigation.navigate('Home');
            }
        };


        const fetchRentedCars = async (userId: number) => {
            try {
                const cars = await getAllCarDetailsByUserId(userId);
                setRentedCars(cars);
            } catch (error) {
                console.error(error);
            }
        };

        getToken();
    }, [navigation]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Auth');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://i.imgur.com/6leloar.jpeg' }}
                    style={styles.profileImage}
                />
                <Text style={styles.fullName}>{userData.fullName}</Text>
                <Text style={styles.email}>{userData.email}</Text>
                <Text style={styles.userId}>ID: {userData.id}</Text>
                <Button
                    title="Logout"
                    buttonStyle={styles.button}
                    onPress={handleLogout}
                />
            </View>
            <View style={styles.rentedCarsContainer}>
                <Text style={styles.sectionTitle}>Rented Cars</Text>
                {rentedCars && rentedCars.length > 0 ?
                    (
                        <>
                            {rentedCars.map((car, index) => (
                                <View key={index} style={styles.carCard}>
                                    <Image
                                        source={{ uri: MACHINE_URL + car.images[0].imagePath }}
                                        style={styles.carImage}
                                    />
                                    <View style={styles.carDetails}>
                                        <Text style={styles.carTitle}>{car.brandName} {car.model}</Text>
                                        <Text style={styles.carDescription}>Rented from {car.rentDate.toString()} to {car.returnDate.toString()}</Text>
                                    </View>
                                </View>
                            ))}
                        </>
                    ) : (
                        <Text style={{ color: '#fff' }}>No rented cars</Text>
                    )}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#1f262e',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        backgroundColor: '#334754',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        maxWidth: 400,
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    fullName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#ddd',
        marginBottom: 5,
    },
    userId: {
        fontSize: 16,
        color: '#aaa',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    rentedCarsContainer: {
        width: '100%',
        maxWidth: 400,
    },
    carList: {
        width: '100%',
        alignItems: 'center',
    },
    carCard: {
        backgroundColor: '#334754',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: '100%',
    },
    carImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    carDetails: {
        width: '100%',
        alignItems: 'flex-start',
    },
    carTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    carDescription: {
        fontSize: 14,
        color: '#ddd',
        marginBottom: 10,
    },
    carPrice: {
        fontSize: 16,
        color: '#fff',
    },
    button: {
        backgroundColor: '#1e90ff',
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        alignSelf: 'center',
    },
});

export default ProfileScreen;
