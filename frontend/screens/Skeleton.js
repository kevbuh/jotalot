import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, TouchableOpacity, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { ENV_DOMAIN } from "@env";

import LottiePinkAvatarIcon from "../animations/LottiePinkAvatar";
import LottieAvatarIcon from "../animations/LottieAvatar";
import ChangePasswordScreen from "./ChangePassword";
import NoteSettingsScreen from "./NoteSettings";
import CreateNoteScreen from "./NewNote";
import NewAccountScreen from "./NewAccount";
import CustomizeScreen from "./CustomizeThemes";
import FeedbackScreen from "./Feedback";
import EditNoteScreen from "./EditNote";
import RegisterScreen from "./Register";
import CreateFolder from "./NewFolder";
import WelcomeScreen from "./Welcome";
import EditFolder from "./EditFolder";
import AccountScreen from "./Account";
import LogoTitle from "../animations/LogoTitle";
import SearchScreen from "./Search";
import TrashScreen from "./Trash";
import LoginScreen from "./Login";
import StatsScreen from "./Statistics";
import HomeScreen from "./Home";
import AIScreen from "./Ai";

import { userToken, userEmail } from "../redux/userSlice";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AIStack = createNativeStackNavigator();

function AiStackScreen() {
  const { colors } = useTheme();
  const scheme = useColorScheme();

  return (
    <AIStackScreen.Navigator>
      <AIStack.Screen name="AI" component={AiScreen} />
    </AIStackScreen.Navigator>
  );
}

function HomeStackScreen(item) {
  const { colors } = useTheme();
  const scheme = useColorScheme();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Main"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Account");
              }}
              style={{
                paddingVertical: 15,
                backgroundColor: colors.button,
                width: 60,
                borderRadius: 10,
              }}
            >
              {scheme !== "dark" ? (
                <LottieAvatarIcon
                  onPress={() => {
                    navigation.navigate("Account");
                  }}
                />
              ) : (
                <LottiePinkAvatarIcon
                  onPress={() => {
                    navigation.navigate("Account");
                  }}
                />
              )}
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
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
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <HomeStack.Screen
        name="Edit Note"
        component={EditNoteScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Ionicons
              name={"cog"}
              size={25}
              color={colors.primary}
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
      <HomeStack.Screen
        name="Untitled Folder"
        component={CreateFolder}
        options={() => ({
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: (props) => <LogoTitle {...props} />,
        })}
      />
      <HomeStack.Screen
        name="Edit Folder"
        component={EditFolder}
        options={() => ({
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: (props) => <LogoTitle {...props} />,
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
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <HomeStack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
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

  const scheme = useColorScheme();

  const { colors } = useTheme();

  const MyDarkTheme = {
    dark: true,
    colors: {
      primary: "#e4007c",
      // background: "#000023",
      background: "#000",
      card: "#121212",
      text: "#ffffff",
      border: "#000028",
      notification: "#9933FF",
      button: "#272727",
      border: "#121212",
      cardBackground: "#272727",
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme,
      background: "#f2f2f2",
      button: "#dddddd",
      border: "#D3D3D3",
      cardBackground: "#ddd",
    },
  };

  const GetUser = () => {
    fetch(`http://${ENV_DOMAIN}/auth/login`, {
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
    GetUser();
  }, []);

  return (
    <NavigationContainer theme={scheme === "dark" ? MyDarkTheme : MyLightTheme}>
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
              } else if (route.name === "AI Main") {
                iconName = focused ? "infinite-sharp" : "infinite-outline";
              }
              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={scheme === "dark" ? "#fff" : "#000"}
                />
              );
            },
            tabBarActiveTintColor: "#121212",
            tabBarInactiveTintColor: "gray",
            tabBarShowLabel: false,
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
          <Tab.Screen name="AI Main" component={AIScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
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

export default MainAppContent;
