import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const ContactThum = ({ name, phone, avatar, textColor, onPress, showName = true, showPhone = true }) => {
  const colorStyle = {
    color: textColor,
  };
  const ImageContact = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageContact onPress={onPress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </ImageContact>

      {/* 👇 chỉ hiện tên nếu showName = true */}
      {showName && name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>}

      {/* 👇 chỉ hiện số nếu showPhone = true */}
      {showPhone && !!phone && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} color={textColor} />
          <Text style={[styles.phone, colorStyle]}>{phone}</Text>
        </View>
      )}
    </View>
  );
};

ContactThum.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  showName: PropTypes.bool,
  showPhone: PropTypes.bool,
};

ContactThum.defaultProps = {
  name: '',
  phone: '',
  textColor: '',
  onPress: null,
  showName: true,
  showPhone: true,
};

export default ContactThum;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
