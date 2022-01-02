import {
  useNavigation,
  useTheme,
  useIsFocused,
} from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import LottieGuyAtDesk from "../animations/LottieGuyAtDesk";
import { userToken } from "../redux/userSlice";
import LottieSearch from "../animations/LottieSearch";
import { useSelector } from "react-redux";
import { ENV_DOMAIN } from "@env";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function SearchScreen() {
  const [searchField, setSearchField] = useState("");
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const user_token = useSelector(userToken);
  const { colors } = useTheme();

  const searchNotes = () => {
    fetch(`http://${ENV_DOMAIN}/notes/search/?search=${searchField}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchNotes();
  }, [searchField, isFocused]);

  const renderNotes = (item) => {
    return (
      <Pressable
        style={[
          styles.notes,
          {
            borderColor: colors.border,
          },
        ]}
        onPress={() => {
          navigation.navigate("Edit Note", {
            item: item,
          });
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: colors.text }}
        >
          {item.text}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.searchBarView,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}
      >
        <TouchableOpacity style={styles.searchIcon}>
          <LottieSearch />
        </TouchableOpacity>
        <TextInput
          KeyboardAvoidingView
          style={[styles.text, { color: colors.text }]}
          placeholder="Search"
          autoCapitalize="none"
          value={searchField}
          onChangeText={setSearchField}
        />
      </View>
      {data.length > 0 ? (
        <View>
          <Text
            style={[
              styles.title,
              {
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          >
            Search Results
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => {
              return renderNotes(item);
            }}
            style={{ height: 450 }}
          />
        </View>
      ) : (
        <Text
          style={[
            styles.noResults,
            {
              borderColor: colors.border,
            },
          ]}
        >
          No search results!
        </Text>
      )}
      <View>
        <TouchableOpacity style={styles.lottie}>
          <LottieGuyAtDesk />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 40,
  },
  notes: {
    width: "95%",
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderRadius: 5,
  },
  searchBarView: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
    width: "94%",
  },
  noResults: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 20,
    borderBottomWidth: 2,
    width: "90%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    borderBottomWidth: 2,
    marginLeft: 10,
    width: "90%",
  },
  lottie: {
    paddingVertical: 90,
    marginRight: 6,
    borderRadius: 10,
  },
  text: {
    fontSize: 23,
    paddingBottom: 9,
    paddingTop: 9,
    paddingRight: "60%",
    marginLeft: 10,
  },
  searchIcon: {
    paddingVertical: 15,
    marginLeft: 6,
    width: 25,
    borderRadius: 10,
  },
});
