import { View, Text, StyleSheet } from "react-native";

export function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                © 2026 IFMaker
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 12,
        left: 0,
        right: 0,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "transparent",
    },

    text: {
        fontSize: 13,
        color: "rgba(255,255,255,0.45)",
        fontWeight: "500",
    },
});