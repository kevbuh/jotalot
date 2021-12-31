import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import ChangePasswordScreen from "./components/ChangePasswordScreen";
import NoteSettingsScreen from "./components/NoteSettingsScreen";
import CreateNoteScreen from "./components/CreateNoteScreen";
import NewAccountScreen from "./components/NewAccountScreen";
import CustomizeScreen from "./components/CustomizeScreen";
import FeedbackScreen from "./components/FeedbackScreen";
import EditNoteScreen from "./components/EditNoteScreen";
import RegisterScreen from "./components/RegisterScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import AccountScreen from "./components/AccountScreen";
import LottieAvatarIcon from "./components/LottieTest";
import SearchScreen from "./components/SearchScreen";
import TrashScreen from "./components/TrashScreen";
import LoginScreen from "./components/LoginScreen";
import StatsScreen from "./components/StatsScreen";
import MainScreen from "./components/MainScreen";
import LogoTitle from "./components/LogoTitle";

import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import { userToken, userEmail } from "./redux/userSlice";
import store, { persistor } from "./redux/store";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function HomeStackScreen(item) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Account");
              }}
              style={{
                paddingVertical: 15,
                backgroundColor: "#DDDDDD",
                width: 60,
                borderRadius: 10,
              }}
            >
              {/* <Text style={{ fontWeight: "bold" }}>Customize</Text> */}
              <LottieAvatarIcon
                // style={{ height: 50, width: 50, backgroundColor: "#e4007c" }}
                onPress={() => {
                  navigation.navigate("Account");
                }}
              />
            </TouchableOpacity>

            // <BasicExample />
          ),
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
        })}
      />
      <HomeStack.Screen name="Account" component={AccountScreen} />
      <HomeStack.Screen name="Stats" component={StatsScreen} />
      <HomeStack.Screen
        name="Change Password"
        component={ChangePasswordScreen}
      />
      <HomeStack.Screen
        name="New Note"
        component={CreateNoteScreen}
        options={{
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <HomeStack.Screen
        name="Edit Note"
        component={EditNoteScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            // <Button
            //   title="Settings"
            //   onPress={() => navigation.navigate("Customize Note")}
            // />
            <Ionicons
              name={"cog"}
              size={25}
              color={"black"}
              onPress={() => {
                navigation.navigate("Customize Note", {
                  item: item,
                });
              }}
              style={{
                marginRight: 5,
              }}
            />
          ),
        })}
      />
      <HomeStack.Screen name="Customize Note" component={NoteSettingsScreen} />
      <HomeStack.Screen name="Customize Theme" component={CustomizeScreen} />
      <HomeStack.Screen
        name="Trash"
        component={TrashScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
        }}
      />
      <HomeStack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerTintColor: "black",
        }}
      />
    </HomeStack.Navigator>
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
        // console.log(data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    // console.log("Going to get user!");
    GetUser();
    // console.log("Got user!");
  }, []);

  return (
    <NavigationContainer>
      {user_email.length > 0 ? (
        <Tab.Navigator
          initialRouteName="New Note"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home-sharp" : "home-outline";
              } else if (route.name === "Search") {
                iconName = "search";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#121212",
            tabBarInactiveTintColor: "gray",
            tabBarShowLabel: false,
          })}
        >
          {/* <Tab.Screen name="Notes" component={NoteStackScreen} /> */}
          <Tab.Screen name="Search" component={SearchScreen} />
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
        </Tab.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
          <AuthStack.Screen name="NewAccount" component={NewAccountScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainAppContent />
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
