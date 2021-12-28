import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import AccountScreen from "./components/AccountScreen";
import CreateNoteScreen from "./components/CreateNoteScreen";
import LogoTitle from "./components/LogoTitle";
import MainScreen from "./components/MainScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import NoteSettingsScreen from "./components/NoteSettingsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TrashScreen from "./components/TrashScreen";
import FeedbackScreen from "./components/FeedbackScreen";
import { extendTheme, NativeBaseProvider } from "native-base";
import EditNoteScreen from "./components/EditNoteScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { userToken, userEmail } from "./redux/userSlice";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

const theme = extendTheme({ colors: newColorTheme });

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              title="Account"
              onPress={() => navigation.navigate("Account")}
            />
          ),
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
        })}
      />
      <HomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <HomeStack.Screen name="Account" component={AccountScreen} />
      <HomeStack.Screen
        name="Edit Note"
        component={EditNoteScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              title="Settings"
              onPress={() => navigation.navigate("Customize Note")}
            />
          ),
        })}
      />
      <HomeStack.Screen name="Customize Note" component={NoteSettingsScreen} />
    </HomeStack.Navigator>
  );
}

function NoteStackScreen() {
  return (
    <Drawer.Navigator initialRouteName="Register">
      <Drawer.Screen
        name="Untitled Note"
        component={CreateNoteScreen}
        options={{
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
        }}
      />
      <Drawer.Screen
        name="Trash"
        component={TrashScreen}
        options={{
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function MainAppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const user_token = useSelector(userToken);
  const user_email = useSelector(userEmail);

  const GetUser = () => {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setIsAuthenticated(true);
        console.log(data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    console.log("Going to get user!");
    GetUser();
    console.log("Got user!");
  }, []);

  // {
  //   user_email.length > 0
  //     ? (
  //       return (
  //       <NavigationContainer>
  //         <AuthStack.Navigator>
  //           <AuthStack.Screen name="Auth" component={AuthScreen} />
  //         </AuthStack.Navigator>
  //       </NavigationContainer>
  //     )
  //     )
  //     : null;
  // }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {user_email.length > 0 ? (
          <Tab.Navigator
            initialRouteName="Untitled Note"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Notes") {
                  iconName = "add";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#121212",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeStackScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    title="Account"
                    onPress={() =>
                      navigation.navigate("Account", {
                        user: userData,
                      })
                    }
                  />
                ),
                headerTitle: "Settings",
                headerLeft: (props) => <LogoTitle {...props} />,
              })}
            />
            <Tab.Screen name="Notes" component={NoteStackScreen} />
          </Tab.Navigator>
        ) : (
          <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <MainAppContent />
    </Provider>
  );
}

export default App;
