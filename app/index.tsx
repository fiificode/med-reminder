import { StyleSheet, Text, View, Animated, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnimation, transform: [{ scale: scaleAnimation }] },
        ]}
      >
        <Image
          source={require("../assets/images/logo1.png")}
          style={{ width: 180, height: 180 }}
        />
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Your Personal Medication Reminder
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bf63",
  },
  logoContainer: {
    alignItems: "center",
  },
});
