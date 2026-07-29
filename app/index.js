import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import PulseMark from "../components/PulseMark";
import Wordmark from "../components/Wordmark";
import { COLORS } from "../constants/theme";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/login"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={[COLORS.bg, "#16090C"]} style={styles.container}>
      <PulseMark size={92} />
      <View style={{ height: 22 }} />
      <Wordmark size={30} />
      <Text style={styles.tagline}>
        Every question, one conversation{"\n"}away from an answer.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  tagline: { marginTop: 8, color: COLORS.sub, fontSize: 13, textAlign: "center", lineHeight: 20 },
});
