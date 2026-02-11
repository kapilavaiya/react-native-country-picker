import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CountryPicker from '../src';
import { CountryCode, Country } from '../src/CountryPicker/types';

export const PreferredCountriesExample = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>With Preferred Countries</Text>
      <Text style={styles.subtitle}>US, CA, GB, AU shown first</Text>
      <CountryPicker
        countryCode={countryCode}
        onSelect={(code, selectedCountry) => {
          setCountryCode(code);
          setCountry(selectedCountry);
        }}
        preferredCountries={['US', 'CA', 'GB', 'AU']}
        sortCountries="name"
        highlightSelected={true}
        selectedItemBackgroundColor="#E3F2FD"
        selectedItemTextColor="#1976D2"
      />
      {country && (
        <View style={styles.info}>
          <Text style={styles.infoText}>Selected: {country.name?.common}</Text>
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
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
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
