import React from "react";
import { Text } from "react-native";
import { COLORS } from "../constants/theme";

export default function Wordmark({ size = 26 }) {
  return (
    <Text style={{ fontSize: size, fontWeight: "700", color: COLORS.text }}>
      Ravindra <Text style={{ color: COLORS.crimson }}>AI</Text>
    </Text>
  );
}
