import {
	Image,
	ImageBackground,
	Share,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useRef, useState} from "react";
import PhoneInput from "react-native-phone-number-input";

const Home = () => {
	const [value, setValue] = useState("");
	const phoneInput = useRef(null);
	const [formattedValue, setFormattedValue] = useState("");

	const See = () => {
		console.log("value =======>", value);
		console.log("formattedValue =======>", formattedValue);
	};
	return (
		<SafeAreaView style={styles.root}>
			<PhoneInput
				ref={phoneInput}
				defaultValue={value}
				defaultCode="BD"
				layout="first"
				onChangeText={(text) => {
					setValue(text);
				}}
				onChangeFormattedText={(text) => {
					setFormattedValue(text);
				}}
				withShadow
				autoFocus
			/>

			<TouchableOpacity
				onPress={See}
				style={{marginTop: 50, marginLeft: 50}}
			>
				<Text>See</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	mapWrapper: {
		flex: 1,
	},
});
