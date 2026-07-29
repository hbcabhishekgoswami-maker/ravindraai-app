import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import Toast from "../components/Toast";
import { COLORS, RADII } from "../constants/theme";
import { checkUsageLimit, sendMessageToAI } from "../constants/backend";

const SUGGESTIONS = [
  { icon: "image-outline", title: "Create an image", sub: "Visualize anything" },
  { icon: "create-outline", title: "Write or edit", sub: "Improve your writing" },
  { icon: "globe-outline", title: "Look something up", sub: "Get real-time answers" },
];

export default function HomeScreen() {
  const router = useRouter();
  const toastRef = useRef(null);
  const [limitReached, setLimitReached] = useState(false);
  const [message, setMessage] = useState("");
  const [devSimulate, setDevSimulate] = useState(false); // remove this toggle once real usage tracking is wired up

  useEffect(() => {
    checkUsageLimit("demo-user").then((res) => setLimitReached(res.limitReached));
  }, []);

  useEffect(() => {
    setLimitReached(devSimulate);
  }, [devSimulate]);

  const handleSend = async () => {
    if (!message.trim()) {
      toastRef.current?.show("Type a message first");
      return;
    }
    toastRef.current?.show("Message sent (demo — connect an AI provider for real replies)");
    await sendMessageToAI([], message);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => router.push("/sidebar")} style={styles.iconBtn}>
          <Ionicons name="menu" size={22} color={COLORS.text} />
        </TouchableOpacity>

        {limitReached ? (
          <TouchableOpacity style={styles.badge} onPress={() => router.push("/paywall")}>
            <Ionicons name="star" size={13} color="#fff" />
            <Text style={styles.badgeText}>Get Plus</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 34 }} />
        )}

        <TouchableOpacity style={styles.iconBtn} onPress={() => toastRef.current?.show("Chat history (demo)")}>
          <Ionicons name="chatbubble-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.greet}>Hello, Ravindra 👋</Text>
        <Text style={styles.sub}>What are we building today?</Text>

        <View style={{ gap: 10, marginTop: 20 }}>
          {SUGGESTIONS.map((s, i) => (
            <TouchableOpacity
              key={i}
              style={styles.card}
              onPress={() => toastRef.current?.show(`${s.title} (demo)`)}
            >
              <View style={styles.cardIcon}>
                <Ionicons name={s.icon} size={17} color={COLORS.ember} />
              </View>
              <View>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Text style={styles.cardSub}>{s.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dev-only helper — remove once real usage tracking is connected */}
        <View style={styles.devRow}>
          <Switch value={devSimulate} onValueChange={setDevSimulate} />
          <Text style={styles.devLabel}>Dev: simulate usage limit reached</Text>
        </View>
      </ScrollView>

      <View style={styles.inputBar}>
        <View style={styles.inputWrap}>
          <TouchableOpacity onPress={() => toastRef.current?.show("Attach file (demo)")}>
            <Ionicons name="add" size={22} color={COLORS.sub} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Ask Ravindra AI anything…"
            placeholderTextColor={COLORS.faint}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={() => toastRef.current?.show("Voice input (demo)")}>
            <Feather name="mic" size={19} color={COLORS.sub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconBtn: { padding: 6 },
  badge: {
    backgroundColor: COLORS.crimson,
    borderRadius: RADII.round,
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badgeText: { color: "#fff", fontSize: 12.5, fontWeight: "600" },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  greet: { fontSize: 24, color: COLORS.text, fontWeight: "700" },
  sub: { color: COLORS.sub, fontSize: 13.5, marginTop: 4 },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: RADII.lg,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(200,30,58,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { color: COLORS.text, fontSize: 13.5, fontWeight: "600" },
  cardSub: { color: COLORS.sub, fontSize: 11.5 },
  devRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 26, opacity: 0.6 },
  devLabel: { color: COLORS.faint, fontSize: 11 },
  inputBar: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8 },
  inputWrap: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: RADII.xl,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: { flex: 1, color: COLORS.text, fontSize: 14 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.crimson,
    alignItems: "center",
    justifyContent: "center",
  },
});
