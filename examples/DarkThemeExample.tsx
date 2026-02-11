import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CountryPicker from '../src';
import { CountryCode } from '../src/CountryPicker/types';

export const DarkThemeExample = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('FR');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dark Theme Variant</Text>
      <CountryPicker
        countryCode={countryCode}
        onSelect={(code) => setCountryCode(code)}
        colors={{
          grayLight: '#424242',
          white: '#1E1E1E',
          grayBackground: '#121212',
          gray: '#9E9E9E',
          dark: '#FFFFFF',
        }}
        iconColor="#64B5F6"
        selectedItemBackgroundColor="#1565C0"
        selectedItemTextColor="#FFFFFF"
        containerStyle={styles.darkContainer}
        modalStyle={styles.darkModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    borderRadius: 12,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
    borderColor: '#424242',
  },
  darkModal: {
    backgroundColor: '#121212',
  },
});
