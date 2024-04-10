import { Text, Card, Button } from "@rneui/themed";
import { MACHINE_URL } from "../Services/Helpers/axiosConfig";
import { CarDetail } from "../Models/CarDetail";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";


type CarProps = {
    car: CarDetail;
    index: number;
}

const CarCard = ({ car, index }: CarProps) => {

    const navigation = useNavigation<any>();

    const handleViewDetails = (car: CarDetail) => {
        navigation.navigate('CarDetailScreen', { car });
    };

    return (
        <View key={index} style={styles.card}>
            <Image source={{ uri: MACHINE_URL + car.images[0].imagePath }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>
                {car.brandName} {car.modelYear} {car.model}
            </Text>
            <Text style={styles.cardText}>
                ${car.dailyPrice}
            </Text>
            <Text style={styles.cardText}>
                {car.description}
            </Text>

            <Button
                title="Details"
                buttonStyle={styles.button}
                onPress={() => handleViewDetails(car)}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#334754',
        backgroundColor: '#1f262e',
        padding: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderBlockColor: '#334754',
    },
    cardTitle: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        justifyContent: 'space-between',
    },
    cardText:{
        color: '#fff',
        marginBottom: 10,
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

export default CarCard;