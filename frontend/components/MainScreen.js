// import * as React from "react";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Pressable,
  LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { userEmail, userToken } from "../redux/userSlice";

function MainScreen(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const user_token = useSelector(userToken);

  // const user_token = useSelector((state) => {
  //   state.user.currentUser.authToken;
  // });

  const GetUser = () => {
    fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "titi@titi.com",
        password: "titipassword54",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setIsAuthenticated(true);
        console.log(data);
      })
      .catch((error) => console.log("error", error));
  };

  // useEffect(() => {
  //   console.log("Going to get user!");
  //   GetUser();
  //   console.log("Got user!");
  // }, []);

  const getNotes = () => {
    fetch("http://localhost:8000/notes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      // body: JSON.stringify({
      //   email: "titi@titi.com",
      //   password: "titipassword54",
      // }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((json) => {
        console.log("MAIN SCREEN TRYING TO GETNOTES: ", json);
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // GetUser();
    getNotes();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500)
      .then(getNotes())
      .then(() => setRefreshing(false))
      .catch((error) => console.log("error", error));
  }, []);

  const renderNotes = (item) => {
    return (
      <Pressable
        style={{
          width: "95%",
          marginHorizontal: 10,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderRadius: 5,
          borderColor: "#D3D3D3",
        }}
        onPress={() => {
          navigation.navigate("Edit Note", {
            item: item,
          });
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 18, fontWeight: "bold" }}
        >
          {item.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {item.text}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text
              style={{
                paddingTop: 25,
                paddingHorizontal: 10,
                paddingBottom: 20,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Notes:
            </Text>
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => {
                return renderNotes(item);
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainScreen;
