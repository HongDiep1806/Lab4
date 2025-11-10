import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

const DetailListIt= ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name={icon} size={24} color="#000" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

// DetailListIt.propTypes = {
//   icon: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
// };

// DetailListIt.defaultProps = {
//   subtitle: "",
// };

export default DetailListIt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  separator: {
    marginTop: 10,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
  },
});
