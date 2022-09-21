import {Alert, StyleSheet, Text, View} from "react-native";
import React, {useRef, useState} from "react";
import {ButtonComp, LinkText, LOGO, TEXT, TopAppBar} from "../component/Reuse";
import COLORS from "../Colors/COLORS";
import PhoneInput from "react-native-phone-number-input";
import {useNavigation} from "@react-navigation/native";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {firebaseConfig} from "../firebase/firebase";
import {sendVerification} from "../firebase/FbPhoneAuth/FbPhoneAuth";

const Login = () => {
	const navigation = useNavigation();
	const [value, setValue] = useState("");
	const phoneInput = useRef(null);
	const [number, setNumber] = useState("");
	const recaptchaVerifier = useRef(null);

	const login = () => {
		if (number.length > 14 || number.length < 14) {
			Alert.alert("invalid number");
			return;
		}
		sendVerification(number, recaptchaVerifier, navigation);
	};
	return (
		<View style={styles.root}>
			<TopAppBar text="Login" />
			<View style={styles.titleContainer}>
				<TEXT
					title="A2Z Services"
					text="welcome to the best services provider system!"
				/>
			</View>
			<LOGO />
			<View style={styles.container}>
				<View style={styles.phoneInputWrapper}>
					<Text style={styles.label}>Phone number</Text>
					<FirebaseRecaptchaVerifierModal
						ref={recaptchaVerifier}
						firebaseConfig={firebaseConfig}
						attemptInvisibleVerification={true}
					/>
					<PhoneInput
						ref={phoneInput}
						defaultValue={value}
						defaultCode="BD"
						layout="first"
						onChangeText={(text) => {
							setValue(text);
						}}
						onChangeFormattedText={(text) => {
							setNumber(text);
						}}
						textContainerStyle={styles.phoneInputStyle}
					/>
				</View>
			</View>
			<View style={styles.label}>
				<ButtonComp text="Login" onPress={login} />
				<LinkText
					text="Don't Have An Account?"
					onPress={() => navigation.navigate("Register")}
				/>
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	titleContainer: {
		height: "22%",
		backgroundColor: COLORS.primary,
		alignItems: "center",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	container: {
		width: "100%",
		paddingHorizontal: 15,
		marginVertical: 15,
	},
	label: {
		paddingHorizontal: 15,
	},
	phoneInputWrapper: {
		width: "100%",
		marginVertical: 10,
		backgroundColor: COLORS.white,
		elevation: 2,
		paddingVertical: 15,
		paddingHorizontal: 6,
		borderRadius: 10,
	},
	phoneInputStyle: {
		backgroundColor: COLORS.white,
	},
});
