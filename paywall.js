import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PulseMark from "../components/PulseMark";
import Toast from "../components/Toast";
import { COLORS, RADII } from "../constants/theme";

const FEATURES = [
  "Higher daily message limits",
  "Priority response speed",
  "Advanced tools & image generation",
];

export default function PaywallScreen() {
  const router = useRouter();
  const toastRef = useRef(null);

  return (
    <LinearGradient colors={["#1A0A0D", COLORS.bg]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mid}>
          <PulseMark size={70} />
          <Text style={styles.title}>You've reached today's limit</Text>
          <Text style={styles.desc}>
            Upgrade to Ravindra AI Plus for higher limits, priority responses, and advanced tools.
          </Text>
          <View style={{ gap: 8, marginTop: 8, alignSelf: "stretch" }}>
            {FEATURES.map((f, i) => (
              <View key={i} style={styles.feat}>
                <View style={styles.dot} />
                <Text style={styles.featText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => toastRef.current?.show("Would open payment flow (demo)")}
        >
          <Ionicons name="star" size={15} color="#fff" />
          <Text style={styles.ctaText}>Try Plus</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center", marginTop: 14 }} onPress={() => router.back()}>
          <Text style={{ color: COLORS.faint, fontSize: 12.5 }}>Not now</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Toast ref={toastRef} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22 },
  mid: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14 },
  title: { color: COLORS.text, fontSize: 20, fontWeight: "700", textAlign: "center" },
  desc: { color: COLORS.sub, fontSize: 13, textAlign: "center", lineHeight: 20 },
  feat: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.ember },
  featText: { color: COLORS.text, fontSize: 12.5 },
  cta: {
    backgroundColor: COLORS.crimson, borderRadius: RADII.md, paddingVertical: 14,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
  },
  ctaText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
