import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const router = useRouter();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");
  return (
    <LinearGradient colors={["#00bf63", "#00b5d3"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo1.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 11,
              textAlign: "center",
              fontWeight: "bold",
              textShadowColor: "rgba(0, 0, 0, 0.2)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
            }}
          >
            Your Personal Medication Reminder
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          {isBiometricSupported ? (
            <Text style={styles.welcomeSubText}>
              Sign in with your Face ID/ Touch ID{" "}
            </Text>
          ) : (
            <Text style={styles.welcomeSubText}>Sign in with your PIN</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              //   router.replace("/login");
            }}
            disabled={isAuthenticating}
            style={[styles.button, isAuthenticating && styles.buttonDisabled]}
          >
            <Ionicons
              name={
                isBiometricSupported ? "finger-print-outline" : "keypad-outline"
              }
              style={{ marginRight: 10 }}
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>
              {isAuthenticating
                ? "Authenticating..."
                : isBiometricSupported
                ? "Authenticate with Face ID/ Touch ID"
                : "Enter with PIN"}
            </Text>
          </TouchableOpacity>
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={20} color="#f44336" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    width: 140,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginBottom: 7,
    textAlign: "center",
  },
  welcomeSubText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 60,
  },
  card: {
    width: width - 40,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "#4CAF50",
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#f44336",
    marginLeft: 10,
    fontSize: 14,
  },
});
