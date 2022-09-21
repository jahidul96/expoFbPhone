import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, {useState} from "react";
import COLORS from "../Colors/COLORS";
import {PhoneAuthProvider, signInWithCredential} from "firebase/auth";
import {auth} from "../firebase/firebase";

const Otp = ({navigation, route}) => {
	console.log("params", route.params);
	const {fullphonenumber, id} = route.params;
	const [code, setCode] = useState("");

	const verify = async () => {
		try {
			const credential = PhoneAuthProvider.credential(id, code);
			await signInWithCredential(auth, credential);
			Alert.alert("Phone authentication successful 👍");
			navigation.navigate("Login");
		} catch (err) {
			Alert.alert(err.message);
		}
	};
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setCode(text)}
			/>
			<TouchableOpacity style={styles.btn} onPress={verify}>
				<Text>verify</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Otp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: "80%",
		backgroundColor: COLORS.white,
		height: 45,
		borderRadius: 10,
		elevation: 2,
		paddingHorizontal: 10,
		color: "#000",
	},
	btn: {
		width: "70%",
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
		elevation: 2,
		borderRadius: 10,
		marginTop: 10,
	},
});
