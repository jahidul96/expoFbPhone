import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Alert,
} from "react-native";
import React, {useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {
	ButtonComp,
	InputComp,
	LinkText,
	LOGO,
	TEXT,
	TopAppBar,
} from "../component/Reuse";
import COLORS from "../Colors/COLORS";
import Ionicons from "react-native-vector-icons/Ionicons";
import EmailIcon from "react-native-vector-icons/Entypo";
import PhoneInput from "react-native-phone-number-input";
import {fbUserRegister} from "../firebase/FbAuth/FbAuthFunc";
import {addUserToFB} from "../firebase/FireStore/FirestoreFunc";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {firebaseConfig} from "../firebase/firebase";
import {sendVerification} from "../firebase/FbPhoneAuth/FbPhoneAuth";

const Register = () => {
	const navigation = useNavigation();

	const [value, setValue] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullname, setFullname] = useState("");
	const phoneInput = useRef(null);
	const recaptchaVerifier = useRef(null);
	const [fullphonenumber, setFullPhoneNumber] = useState("");

	const submitDetails = () => {
		let fields = [email, password, fullname, fullphonenumber];
		let required = fields.every(Boolean);

		if (!required) {
			return Alert.alert("fill all the fields");
		}
		if (fullphonenumber.length > 14 || fullphonenumber.length < 14) {
			Alert.alert("invalid number");
			return;
		}
		if (email.length < 6 || password.length < 6) {
			Alert.alert("must be 6 character long");
			return;
		}
		sendVerification(fullphonenumber, recaptchaVerifier, navigation);
		fbUserRegister(email, password)
			.then((data) => {
				const {uid} = data.user;
				let info = {fullname, email, uid, fullphonenumber};
				addUserToFB(info, uid);
			})
			.catch((err) => {
				console.log("some problem happend");
			});
	};

	return (
		<View style={styles.root}>
			<TopAppBar text="Register" />
			<ScrollView>
				<View style={styles.titleContainer}>
					<TEXT
						title="A2Z Services"
						text="welcome to the best services provider system!"
					/>
				</View>
				<LOGO />
				<View style={{paddingHorizontal: 15}}>
					<View style={styles.formContainer}>
						<FormItem
							label="Full Name"
							name="person"
							setValue={setFullname}
						/>
						<FormItem
							label="Email"
							name="email"
							setValue={setEmail}
						/>
						<View style={styles.formItem}>
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
									setFullPhoneNumber(text);
								}}
								textContainerStyle={styles.phoneInputStyle}
							/>
						</View>
						<FormItem
							label="Password"
							name="lock-closed"
							extraItemStyle={styles.extraItemStyle}
							setValue={setPassword}
						/>
					</View>
				</View>
			</ScrollView>
			<BottomComp navigation={navigation} onPress={submitDetails} />
		</View>
	);
};

export default Register;

const FormItem = ({label, name, extraItemStyle, setValue}) => (
	<View style={[styles.formItem, extraItemStyle]}>
		<Text style={styles.label}>{label}</Text>
		<View style={styles.itemInputWrapper}>
			{name == "email" ? (
				<EmailIcon name="email" size={20} />
			) : (
				<Ionicons name={name} size={20} />
			)}

			<View style={styles.inputWrapper}>
				<InputComp placeholder={label} setValue={setValue} />
			</View>
		</View>
	</View>
);
const BottomComp = ({navigation, onPress}) => {
	return (
		<View style={styles.BottomCompStyles}>
			<ButtonComp text="Submit" onPress={onPress} />
			<LinkText
				text="Already Have An Account?"
				onPress={() => navigation.navigate("Login")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	titleContainer: {
		height: 150,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	formContainer: {
		backgroundColor: COLORS.white,
		elevation: 2,
		borderRadius: 10,
		marginVertical: 15,
		paddingVertical: 15,
	},
	formItem: {
		marginBottom: 12,
		borderBottomColor: COLORS.gray,
		borderBottomWidth: 1,
	},
	label: {
		paddingHorizontal: 15,
	},
	itemInputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 8,
		paddingHorizontal: 15,
	},
	inputWrapper: {width: "80%", marginLeft: 15},

	BottomCompStyles: {
		height: "18%",
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 20,
	},
	phoneInputStyle: {
		backgroundColor: COLORS.white,
	},
	extraItemStyle: {
		marginBottom: 0,
		borderBottomWidth: 0,
	},
});
