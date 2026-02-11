import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CountryPicker from '../src';
import { CountryCode } from '../src/CountryPicker/types';

export const CustomStyledExample = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('GB');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Styled Picker</Text>
      <CountryPicker
        countryCode={countryCode}
        onSelect={(code) => setCountryCode(code)}
        colors={{
          grayLight: '#D0D0D0',
          white: '#FFFFFF',
          grayBackground: '#F0F0F0',
          gray: '#888888',
          dark: '#333333',
        }}
        containerStyle={styles.customContainer}
        containerHeight={60}
        flagSize={36}
        fontSize={{
          callingCode: 18,
          header: 20,
        }}
        spacing={{
          containerPadding: 16,
          flagMargin: 12,
        }}
        borderRadius={{
          container: 12,
          flag: 18,
        }}
        shadow={{
          container: true,
        }}
        elevation={{
          container: 4,
        }}
        iconColor="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  customContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
});
