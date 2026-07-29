import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "../components/Toast";
import { COLORS, RADII } from "../constants/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const toastRef = useRef(null);

  const Row = ({ icon, label, value, accent, onPress }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={17} color={accent ? COLORS.ember : COLORS.sub} />
      <Text style={[styles.rowLabel, accent && { color: COLORS.ember, fontWeight: "600" }]}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={14} color={COLORS.faint} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headTitle}>Settings</Text>
      </View>

      <ScrollView>
        <View style={styles.groupBox}>
          <Row icon="sparkles-outline" label="Personalization" onPress={() => toastRef.current?.show("Personalization (demo)")} />
          <Row icon="server-outline" label="Memory" onPress={() => toastRef.current?.show("Memory (demo)")} />
          <Row icon="extension-puzzle-outline" label="Plugins" onPress={() => toastRef.current?.show("Plugins (demo)")} />
          <Row icon="phone-portrait-outline" label="Remote control" onPress={() => toastRef.current?.show("Remote control (demo)")} />
        </View>

        <Text style={styles.groupTitle}>Account</Text>
        <View style={styles.groupBox}>
          <Row icon="briefcase-outline" label="Workspace" value="Personal" onPress={() => toastRef.current?.show("Workspace (demo)")} />
          <Row icon="star" label="Upgrade to Plus" accent onPress={() => router.push("/paywall")} />
        </View>

        <Text style={styles.groupTitle}>Developer</Text>
        <View style={styles.groupBox}>
          <Row icon="key-outline" label="API Keys" value="Not connected" onPress={() => router.push("/api-keys")} />
        </View>

        <Text style={styles.groupTitle}>App</Text>
        <View style={styles.groupBox}>
          <Row icon="color-palette-outline" label="Appearance" value="System" onPress={() => toastRef.current?.show("Appearance (demo)")} />
          <Row icon="settings-outline" label="General" onPress={() => toastRef.current?.show("General (demo)")} />
          <Row icon="shield-checkmark-outline" label="Security & login" onPress={() => toastRef.current?.show("Security & login (demo)")} />
          <Row icon="notifications-outline" label="Notifications" onPress={() => toastRef.current?.show("Notifications (demo)")} />
          <Row icon="bug-outline" label="Report a bug" onPress={() => toastRef.current?.show("Report a bug (demo)")} />
          <Row icon="information-circle-outline" label="About" onPress={() => toastRef.current?.show("About (demo)")} />
        </View>

        <TouchableOpacity style={styles.logout} onPress={() => { toastRef.current?.show("Logged out (demo)"); router.replace("/login"); }}>
          <Ionicons name="log-out-outline" size={17} color={COLORS.crimson} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20, paddingTop: 12 },
  head: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  headTitle: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  groupTitle: { color: COLORS.faint, fontSize: 11, textTransform: "uppercase", marginTop: 18, marginBottom: 6, marginLeft: 4 },
  groupBox: { backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1, borderRadius: RADII.md, overflow: "hidden" },
  row: {
    flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 13, paddingHorizontal: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder,
  },
  rowLabel: { color: COLORS.text, fontSize: 13.5, flex: 1 },
  rowValue: { color: COLORS.faint, fontSize: 12.5, marginRight: 4 },
  logout: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 16, paddingHorizontal: 4 },
  logoutText: { color: COLORS.crimson, fontSize: 13.5 },
});
