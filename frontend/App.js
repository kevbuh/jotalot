import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
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

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

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
        })}
      />
      <HomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <HomeStack.Screen name="Account" component={AccountScreen} />
    </HomeStack.Navigator>
  );
}

function NoteStackScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Note"
      // drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Note" component={CreateNoteScreen} />
      <Drawer.Screen name="Customize Note" component={NoteSettingsScreen} />
      <Drawer.Screen name="Add a note" component={CreateNoteScreen} />
      <Drawer.Screen name="Trash" component={TrashScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
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
          <Tab.Screen name="Notes" component={NoteStackScreen} />
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  title="Account"
                  onPress={() => navigation.navigate("Account")}
                />
              ),
              headerTitle: "Settings",
              headerLeft: (props) => <LogoTitle {...props} />,
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
