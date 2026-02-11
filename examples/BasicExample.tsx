import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CountryPicker from '../src';
import { CountryCode, Country } from '../src/CountryPicker/types';

export const BasicExample = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Country Picker</Text>
      <CountryPicker
        countryCode={countryCode}
        onSelect={(code, selectedCountry) => {
          setCountryCode(code);
          setCountry(selectedCountry);
        }}
      />
      {country && (
        <View style={styles.info}>
          <Text style={styles.infoText}>Selected: {country.name?.common}</Text>
          <Text style={styles.infoText}>Code: {countryCode}</Text>
          <Text style={styles.infoText}>Calling Code: +{country.callingCode[0]}</Text>
        </View>
      )}
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
  info: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    marginVertical: 4,
  },
});
