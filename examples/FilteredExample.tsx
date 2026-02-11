import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CountryPicker from '../src';
import { CountryCode } from '../src/CountryPicker/types';

export const FilteredExample = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('US');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtered Countries</Text>
      <Text style={styles.subtitle}>Only North American countries</Text>
      <CountryPicker
        countryCode={countryCode}
        onSelect={(code) => setCountryCode(code)}
        includedCountries={['US', 'CA', 'MX']}
        sortCountries="name"
        headerText="Select North American Country"
        searchPlaceholder="Search countries..."
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
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
});
