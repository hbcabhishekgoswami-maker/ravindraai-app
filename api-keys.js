import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "../components/Toast";
import { COLORS, RADII } from "../constants/theme";

// This screen is a placeholder for wiring up a real AI provider.
// See constants/backend.js — that's where the actual connection logic goes.
// The label shown to end users on the Chat screen never changes from
// "Ravindra AI", no matter which provider is connected here.
export default function ApiKeysScreen() {
  const router = useRouter();
  const toastRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headTitle}>Developer · API Keys</Text>
      </View>

      <Text style={styles.hint}>
        This is where your real AI provider connection will live. Not visible to
        end users — for your setup only. See constants/backend.js in the code.
      </Text>

      <Text style={styles.fieldLabel}>Provider</Text>
      <View style={styles.field}><Text style={styles.fieldText}>Select provider ▾</Text></View>

      <Text style={styles.fieldLabel}>API Key</Text>
      <View style={styles.field}><Text style={styles.fieldText}>•••••••••••••••••••••••• (paste here)</Text></View>

      <Text style={styles.fieldLabel}>Model routing label shown to users</Text>
      <View style={styles.field}><Text style={styles.fieldText}>"Ravindra AI" (fixed — provider name hidden)</Text></View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => toastRef.current?.show("Saved (demo — connect a real key in constants/backend.js)")}
      >
        <Text style={styles.saveText}>Save connection</Text>
      </TouchableOpacity>

      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20, paddingTop: 12 },
  head: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 14 },
  headTitle: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  hint: { color: COLORS.faint, fontSize: 11, lineHeight: 17, marginBottom: 18 },
  fieldLabel: { color: COLORS.sub, fontSize: 11.5, marginBottom: 6 },
  field: {
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADII.md, padding: 12, marginBottom: 14,
  },
  fieldText: { color: "#6B6B70", fontSize: 12.5 },
  saveBtn: { backgroundColor: COLORS.crimson, borderRadius: RADII.md, paddingVertical: 13, alignItems: "center", marginTop: 6 },
  saveText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
