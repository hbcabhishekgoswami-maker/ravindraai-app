import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Easing } from "react-native";
import { COLORS } from "../constants/theme";

// The app's signature animated mark — a pulsing ring behind Ravindra's
// actual app icon artwork (assets/images/logo-mark.png).
// Used on Splash, Login, and the Paywall screen.
export default function PulseMark({ size = 64 }) {
  const scale = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.18,
          duration: 2200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/images/logo-mark.jpg")}        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
        }}
        resizeMode="contain"
      />
      <Animated.View
        style={{
          position: "absolute",
          width: size + 12,
          height: size + 12,
          borderRadius: (size + 12) * 0.28,
          borderWidth: 1.5,
          borderColor: COLORS.crimson,
          transform: [{ scale }],
          opacity,
        }}
      />
    </View>
  );
}
