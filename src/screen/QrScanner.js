import QRCode from "react-native-qrcode-svg";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {BarCodeScanner} from "expo-barcode-scanner";
import {
	View,
	StyleSheet,
	Platform,
	PermissionsAndroid,
	ToastAndroid,
	Text,
	TouchableOpacity,
} from "react-native";
// import RNFS from "react-native-fs";

const QrScanner = () => {
	const initialItemState = {
		name: "Jahidul Islam",
		profession: "Student",
	};

	const [item, setItem] = useState(initialItemState);
	const [show, setShow] = useState(false);
	const [productQRref, setProductQRref] = useState();

	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [text, setText] = useState("Not yet scanned");

	const askForCameraPermission = async () => {
		const {status} = await BarCodeScanner.requestPermissionsAsync();
		setHasPermission(status === "granted");
	};

	useEffect(() => {
		askForCameraPermission();
	}, []);

	const toggleComp = () => {
		setShow(true);
	};

	return (
		<View style={styles.container}>
			{show ? (
				<>
					<Text style={styles.qrText}>QR Code</Text>
					<QRCODE
						value={JSON.stringify(item)}
						getRef={(c) => setProductQRref(c)}
					/>
					<View style={styles.btnWrapper}>
						<ButtonComp text="Save To Galley" />
						<ButtonComp
							text="Scan Qr Code"
							click={askForCameraPermission}
						/>
					</View>

					<TouchableOpacity
						style={styles.backBtnContainer}
						onPress={() => setShow(false)}
					>
						<Ionicons name="arrow-back" size={24} color="white" />
						<Text style={styles.backText}>Back</Text>
					</TouchableOpacity>
				</>
			) : (
				<View style={styles.btnWrapper}>
					<ButtonComp
						text="Qr Code"
						click={toggleComp}
						toggle={true}
					/>
				</View>
			)}
		</View>
	);
};
export default QrScanner;

const QRCODE = ({value, getRef}) => {
	return (
		<QRCode
			value={value}
			size={200}
			color="black"
			backgroundColor="white"
			getRef={getRef}
		/>
	);
};

const ButtonComp = ({text, click, toggle}) => {
	return (
		<TouchableOpacity style={styles.button} onPress={() => click()}>
			<Text style={styles.save}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	btnWrapper: {
		width: "100%",
		paddingHorizontal: 15,
		marginVertical: 20,
	},

	button: {
		borderRadius: 30,
		padding: 15,
		bottom: 0,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		color: "#fff",
		backgroundColor: "#273746",
	},

	qrText: {
		top: -20,
		color: "#000",
		fontSize: 18,
		fontWeight: "bold",
	},

	save: {
		color: "#fff",
		fontSize: 16,
		textTransform: "capitalize",
	},
	backBtnContainer: {
		position: "absolute",
		top: 50,
		left: 15,
		width: "25%",
		height: 35,
		backgroundColor: "#273746",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	backText: {
		color: "#fff",
		fontWeight: "bold",
		marginLeft: 5,
	},
});
