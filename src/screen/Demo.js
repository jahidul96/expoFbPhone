import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState, useEffect, useRef} from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {firebaseConfig, auth, db} from "../firebase/firebase";

import {PhoneAuthProvider} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import COLORS from "../Colors/COLORS";
import PhoneInput from "react-native-phone-number-input";

const Demo = () => {
	const [value, setValue] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const recaptchaVerifier = useRef(null);
	const navigation = useNavigation();
	const phoneInput = useRef(null);
	const [fullphonenumber, setFullPhoneNumber] = useState("");

	const sendVerification = () => {
		const phoneProvider = new PhoneAuthProvider(auth);
		phoneProvider
			.verifyPhoneNumber(fullphonenumber, recaptchaVerifier.current)
			.then((id) => {
				if (id) {
					navigation.navigate("OTP", {id, fullphonenumber});
				}
			})
			.catch((err) => {
				if (err.code == "auth/invalid-phone-number") {
					Alert.alert("", "Please, enter a valid phone number.");
				} else if (err.code == "auth/too-many-requests") {
					Alert.alert(
						"",
						"This number is temporary blocked for too many requests.Try later or try again with another number."
					);
				} else {
					Alert.alert("", err.message);
				}
			});
	};

	return (
		<SafeAreaView style={styles.root}>
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
					setFullPhoneNumber(text);
				}}
				textContainerStyle={styles.phoneInputStyle}
			/>
			<TouchableOpacity style={styles.btn} onPress={sendVerification}>
				<Text>sendVerificationcode</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Demo;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	btn: {
		width: "70%",
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
		elevation: 2,
		borderRadius: 10,
	},
	input: {
		width: "100%",
		height: 45,
		backgroundColor: COLORS.white,
		elevation: 2,
	},
});
