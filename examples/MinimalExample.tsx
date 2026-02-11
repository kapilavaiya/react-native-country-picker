import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CountryPicker from '../src';
import { CountryCode } from '../src/CountryPicker/types';

export const MinimalExample = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('CA');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minimal Picker</Text>
      <CountryPicker
        countryCode={countryCode}
        onSelect={(code) => setCountryCode(code)}
        showCountryName={false}
        showFlag={true}
        showCallingCode={true}
        flagSize={24}
        containerHeight={45}
        fontSize={{
          callingCode: 16,
        }}
        spacing={{
          containerPadding: 12,
          flagMargin: 8,
        }}
        borderRadius={{
          container: 6,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
});
