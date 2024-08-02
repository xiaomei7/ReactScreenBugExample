import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Button, View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

const OverlayStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

function DetailsScreen({ navigation }: DetailsScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details Again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

function OverlayScreen({ onClose }: DetailsScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Overlay screen</Text>
      <Button title="Close overlay" onPress={onClose} />
    </View>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
        headerShadowVisible: false,
      }}
      backBehavior="none"
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerShadowVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

const opts: NativeStackNavigationOptions = {
  fullScreenGestureEnabled: true,
  headerTransparent: true,
  headerTitleAlign: "center",
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  animation: "default",
  headerBackButtonMenuEnabled: false,
};

export default function App() {
  const [isVisible, setIsVisible] = React.useState(true);
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={opts}>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              headerShown: false,
              headerTransparent: true,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {isVisible && (
        <View style={StyleSheet.absoluteFill}>
          <NavigationContainer>
            <OverlayStack.Navigator screenOptions={opts}>
              <OverlayStack.Screen
                name="Overlay"
                component={() => (
                  <OverlayScreen
                    onClose={() => {
                      setIsVisible(false);
                    }}
                  />
                )}
              />
            </OverlayStack.Navigator>
          </NavigationContainer>
        </View>
      )}
    </View>
  );
}
