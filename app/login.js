import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PulseMark from "../components/PulseMark";
import Wordmark from "../components/Wordmark";
import Toast from "../components/Toast";
import { COLORS, RADII } from "../constants/theme";
import { signInWithGoogle } from "../constants/backend";

export default function LoginScreen() {
  const router = useRouter();
  const toastRef = useRef(null);

  const handleGoogle = async () => {
    const res = await signInWithGoogle();
    toastRef.current?.show(res.message);
    router.replace("/home");
  };

  const handleAccount = async () => {
    toastRef.current?.show("Continuing (demo)");
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 4 }}>
        <Ionicons name="chevron-back" size={22} color={COLORS.text} />
      </TouchableOpacity>

      <View style={styles.mid}>
        <PulseMark size={72} />
        <View style={{ height: 12 }} />
        <Wordmark size={24} />
        <View style={{ height: 10 }} />
        <Text style={styles.welcomeTitle}>Welcome back</Text>
        <Text style={styles.welcomeSub}>Sign in to pick up where you left off</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleGoogle}>
          <Text style={styles.gLetter}>G</Text>
          <Text style={styles.btnPrimaryText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGhost} onPress={handleAccount}>
          <Ionicons name="person-circle-outline" size={20} color={COLORS.sub} />
          <View>
            <Text style={styles.accName}>Continue with this account</Text>
            <Text style={styles.accEmail}>ravindrasolar.rs@gmail.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnGhost, { justifyContent: "center" }]}
          onPress={() => toastRef.current?.show("More sign-in options (demo)")}
        >
          <Text style={{ color: COLORS.text, fontSize: 14 }}>Log in another way</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our <Text style={styles.link}>Terms</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 22, paddingTop: 12 },
  mid: { flex: 1, alignItems: "center", justifyContent: "center" },
  welcomeTitle: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  welcomeSub: { color: COLORS.sub, fontSize: 13, marginTop: 2 },
  bottom: { paddingBottom: 20, gap: 10 },
  btnPrimary: {
    backgroundColor: COLORS.text,
    borderRadius: RADII.md,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  gLetter: { fontWeight: "700", fontSize: 14 },
  btnPrimaryText: { color: "#111", fontSize: 14, fontWeight: "600" },
  btnGhost: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: RADII.md,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  accName: { color: COLORS.text, fontSize: 14 },
  accEmail: { color: COLORS.sub, fontSize: 11.5 },
  terms: { textAlign: "center", fontSize: 11, color: COLORS.faint, marginTop: 6, lineHeight: 17 },
  link: { color: COLORS.crimson },
});
