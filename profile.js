import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "../components/Toast";
import { COLORS, RADII } from "../constants/theme";
import { saveProfile } from "../constants/backend";

export default function ProfileScreen() {
  const router = useRouter();
  const toastRef = useRef(null);
  const [name, setName] = useState("Ravindra Solar");
  const [username, setUsername] = useState("ravindrasolar.rs");

  const handleSave = async () => {
    const res = await saveProfile({ name, username });
    toastRef.current?.show(res.message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headTitle}>Profile</Text>
      </View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <View style={styles.avatarBig}>
          <Text style={styles.avatarBigText}>RS</Text>
          <TouchableOpacity
            style={styles.camBadge}
            onPress={() => toastRef.current?.show("Change photo (demo)")}
          >
            <Ionicons name="camera" size={12} color={COLORS.sub} />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameUnder}>{name}</Text>
      </View>

      <Text style={styles.fieldLabel}>Name</Text>
      <TextInput style={styles.field} value={name} onChangeText={setName} placeholderTextColor={COLORS.faint} />

      <Text style={styles.fieldLabel}>Username</Text>
      <TextInput style={styles.field} value={username} onChangeText={setUsername} placeholderTextColor={COLORS.faint} />

      <Text style={styles.hint}>Your profile helps people recognize you.</Text>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={{ color: COLORS.text, fontSize: 14 }}>Cancel</Text>
      </TouchableOpacity>

      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20, paddingTop: 12 },
  head: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 18 },
  headTitle: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  avatarBig: {
    width: 76, height: 76, borderRadius: 38, backgroundColor: COLORS.crimsonDark,
    alignItems: "center", justifyContent: "center", position: "relative",
  },
  avatarBigText: { color: "#fff", fontSize: 24, fontWeight: "700" },
  camBadge: {
    position: "absolute", bottom: -2, right: -2, width: 26, height: 26, borderRadius: 13,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  nameUnder: { color: COLORS.text, fontSize: 15, fontWeight: "600", marginTop: 10 },
  fieldLabel: { color: COLORS.sub, fontSize: 11.5, marginBottom: 6 },
  field: {
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADII.md, padding: 12, color: COLORS.text, fontSize: 13.5, marginBottom: 14,
  },
  hint: { color: COLORS.faint, fontSize: 11.5, marginBottom: 18 },
  saveBtn: { backgroundColor: COLORS.crimson, borderRadius: RADII.md, paddingVertical: 13, alignItems: "center" },
  saveText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  cancelBtn: {
    marginTop: 10, borderRadius: RADII.md, paddingVertical: 13, alignItems: "center",
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
  },
});
