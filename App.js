import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./src/screen/Home";
import Demo from "./src/screen/Demo";
import Register from "./src/screen/Register";
import Login from "./src/screen/Login";
import Otp from "./src/screen/Otp";

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				{/* <Stack.Screen name="Demo" component={Demo} /> */}

				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="OTP" component={Otp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default App;
