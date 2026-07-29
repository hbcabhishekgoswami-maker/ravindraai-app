import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import Toast from "../components/Toast";
import { COLORS } from "../constants/theme";

const NAV_ITEMS = [
  { icon: "add", label: "New chat", route: "/home" },
  { icon: "folder-outline", label: "Library" },
  { icon: "document-text-outline", label: "Projects" },
  { icon: "extension-puzzle-outline", label: "Plugins" },
  { icon: "construct-outline", label: "Tools" },
  { icon: "ellipsis-horizontal", label: "More" },
];

const RECENTS = [
  "Solar plant sizing help",
  "Business plan ideas",
  "Logo direction notes",
  "Code review: routing",
  "Travel plan draft",
];

export default function SidebarScreen() {
  const router = useRouter();
  const toastRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.logoSq} />
        <Text style={styles.wordmark}>Ravindra AI</Text>
        <Ionicons name="search" size={18} color={COLORS.sub} />
      </View>

      {NAV_ITEMS.map((n, i) => (
        <TouchableOpacity
          key={i}
          style={styles.navItem}
          onPress={() => (n.route ? router.push(n.route) : toastRef.current?.show(`${n.label} (demo)`))}
        >
          <Ionicons name={n.icon} size={17} color={COLORS.sub} />
          <Text style={styles.navLabel}>{n.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionLabel}>Recent</Text>
      <ScrollView style={{ flex: 1 }}>
        {RECENTS.map((r, i) => (
          <TouchableOpacity key={i} onPress={() => toastRef.current?.show("Opening chat (demo)")}>
            <Text style={styles.recent} numberOfLines={1}>{r}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.userRow} onPress={() => router.push("/profile")}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RS</Text>
        </View>
        <Text style={styles.userName}>Ravindra Solar</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.faint} />
      </TouchableOpacity>

      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg2, paddingHorizontal: 14, paddingTop: 10 },
  top: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16, paddingHorizontal: 4 },
  logoSq: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.crimson },
  wordmark: { color: COLORS.text, fontSize: 14.5, fontWeight: "700", flex: 1 },
  navItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 9, paddingHorizontal: 8 },
  navLabel: { color: COLORS.text, fontSize: 13.5 },
  sectionLabel: { color: COLORS.faint, fontSize: 11, marginTop: 16, marginBottom: 6, marginLeft: 8, textTransform: "uppercase" },
  recent: { color: COLORS.sub, fontSize: 13, paddingVertical: 8, paddingHorizontal: 8 },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.faint, alignItems: "center", justifyContent: "center" },
  avatarText: { color: COLORS.text, fontSize: 11, fontWeight: "700" },
  userName: { color: COLORS.text, fontSize: 13, flex: 1 },
});
