import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { COLORS, RADII } from "../constants/theme";

// Global toast — call Toast.show("message") from anywhere via the ref pattern below.
const Toast = forwardRef((props, ref) => {
  const [msg, setMsg] = useState("");
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const timer = useRef(null);

  useImperativeHandle(ref, () => ({
    show(text) {
      setMsg(text);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 20, duration: 200, useNativeDriver: true }),
        ]).start();
      }, 1800);
    },
  }));

  if (!msg) return null;

  return (
    <Animated.View style={[styles.toast, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.text}>{msg}</Text>
    </Animated.View>
  );
});

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADII.xl,
    zIndex: 999,
  },
  text: { color: COLORS.text, fontSize: 13 },
});
