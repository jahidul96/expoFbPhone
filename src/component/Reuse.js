import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	TextInput,
} from "react-native";
import BackIcon from "react-native-vector-icons/Ionicons";
import COLORS from "../Colors/COLORS";

const img =
	"https://co.design/conversations/content/images/2020/03/Sprint-logo-design-Codesign-agency.png";

export const TopAppBar = ({text}) => (
	<View style={styles.TopAppBarContainer}>
		<TouchableOpacity>
			<BackIcon name="chevron-back-sharp" size={25} color="#fff" />
		</TouchableOpacity>
		<Text style={styles.appbarText}>{text}</Text>
		<View></View>
	</View>
);

export const ButtonComp = ({text, onPress}) => (
	<TouchableOpacity style={styles.btnContainer} onPress={onPress}>
		<Text style={styles.btnText}>{text}</Text>
	</TouchableOpacity>
);

export const LinkText = ({text, onPress}) => (
	<TouchableOpacity style={styles.LinkWrapper} onPress={onPress}>
		<Text style={styles.linkText}>{text}</Text>
	</TouchableOpacity>
);

export const TEXT = ({title, text}) => (
	<>
		<Text style={styles.logoText}>{title}</Text>
		<Text style={styles.welcomeText}>{text}</Text>
	</>
);

export const LOGO = () => (
	<View style={styles.imgWrapper}>
		<Image source={{uri: img}} style={styles.imgStyle} />
	</View>
);

export const InputComp = ({placeholder, setValue}) => (
	<TextInput
		style={styles.inputStyle}
		placeholder={placeholder}
		onChangeText={(text) => setValue(text)}
	/>
);

const styles = StyleSheet.create({
	TopAppBarContainer: {
		width: "100%",
		height: "11%",
		backgroundColor: COLORS.primary,
		flexDirection: "row",
		alignItems: "flex-end",
		paddingBottom: 15,
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	appbarText: {
		fontWeight: "bold",
		fontSize: 17,
		color: COLORS.white,
		letterSpacing: 1,
		marginLeft: -15,
	},
	btnContainer: {
		width: "100%",
		height: 45,
		backgroundColor: COLORS.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		elevation: 2,
	},
	btnText: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 16,
	},
	LinkWrapper: {
		alignItems: "center",
		marginVertical: 10,
	},
	linkText: {
		color: COLORS.primary,
		fontSize: 18,
		marginTop: 5,
	},
	logoText: {
		fontSize: 25,
		color: COLORS.white,
		fontWeight: "bold",
		letterSpacing: 1,
	},
	welcomeText: {
		color: COLORS.white,
		marginTop: 3,
	},
	imgWrapper: {
		alignItems: "center",
		marginTop: -60,
	},
	imgStyle: {
		width: 120,
		height: 100,
		borderRadius: 20,
	},
	inputStyle: {
		width: "100%",
		height: 45,
		fontSize: 17,
	},
});
