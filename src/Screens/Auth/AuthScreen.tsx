import { Input } from '@rneui/base'
import { Button } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LoginModel } from '../../Models/loginModel'
import { loginUser, registerUser } from '../../Services/authService'
import { useNavigation } from '@react-navigation/native'

const AuthScreen = () => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [firstName, setFirstName] = useState({ value: '', error: '' })
    const [lastName, setLastName] = useState({ value: '', error: '' })
    const [isRegister, setIsRegister] = useState(false)
    const navigation = useNavigation<any>();

    const handleLogin = () => {
        const loginModel: LoginModel = {
            email: email.value,
            password: password.value
        }
        loginUser(loginModel).then((response) => {
            if (response && response.userId) {
                Alert.alert("Login Successful", `Welcome back, ${response.fullName}!`);
                navigation.navigate('Home');
            }
        }).catch((error) => {
            Alert.alert("Login Failed", error.message);
            console.error(error)
        })
    }

    const handleRegister = async () => {
        const registerModel = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        }
        registerUser(registerModel).then((response) => {
            if (response && response.userId) {
                Alert.alert("Registration Successful", `Welcome, ${response.fullName}!`);
                navigation.navigate('Home');
            }
        }).catch((error) => {
            Alert.alert("Registration Failed", error.message);
            console.error(error)
        })
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Image
                    source={{ uri: 'https://i.imgur.com/6leloar.jpeg' }}
                    style={styles.headerImage}
                />
                {isRegister && (
                    <>
                        <Input
                            placeholder="First Name"
                            value={firstName.value}
                            onChangeText={(text) => setFirstName({ value: text, error: '' })}
                            errorMessage={firstName.error}
                            containerStyle={styles.input}
                            inputStyle={{ color: '#fff' }} // optional: change text color
                        />
                        <Input
                            placeholder="Last Name"
                            value={lastName.value}
                            onChangeText={(text) => setLastName({ value: text, error: '' })}
                            errorMessage={lastName.error}
                            containerStyle={styles.input}
                            inputStyle={{ color: '#fff' }} // optional: change text color
                        />
                    </>
                )}
                <Input
                    placeholder="Email"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    errorMessage={email.error}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    containerStyle={styles.input}
                    inputStyle={{ color: '#fff' }} // optional: change text color
                />
                <Input
                    placeholder="Password"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    errorMessage={password.error}
                    secureTextEntry
                    autoCapitalize="none"
                    textContentType="password"
                    containerStyle={styles.input}
                    inputStyle={{ color: '#fff' }} // optional: change text color
                />
                <Button
                    title={isRegister ? "Register" : "Login"}
                    onPress={isRegister ? handleRegister : handleLogin}
                    buttonStyle={styles.button}
                />
                <Text
                    style={styles.toggleText}
                    onPress={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#1f262e',
        padding: 20,
    },
    form: {
        marginVertical: 20,
    },
    input: {
        marginBottom: 15,

    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#1e90ff',
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        width: '50%',
        alignSelf: 'center',
    },
    toggleText: {
        color: '#1e90ff',
        marginTop: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
})

export default AuthScreen
