import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CountryPicker from '../src';
import { CountryCode, Country } from '../src/CountryPicker/types';

export const FullFeaturedExample = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('JP');
  const [country, setCountry] = useState<Country | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Featured Example</Text>
      <Text style={styles.subtitle}>All features enabled</Text>
      
      <CountryPicker
        countryCode={countryCode}
        onSelect={(code, selectedCountry) => {
          setCountryCode(code);
          setCountry(selectedCountry);
        }}
        preferredCountries={['US', 'CA', 'GB', 'AU', 'DE', 'FR']}
        sortCountries="name"
        showCurrency={true}
        showSubregion={false}
        autoFocusSearch={true}
        highlightSelected={true}
        selectedItemBackgroundColor="#E8F5E9"
        selectedItemTextColor="#2E7D32"
        containerHeight={65}
        flagSize={32}
        fontSize={{
          callingCode: 18,
          countryName: 16,
          header: 20,
          search: 16,
          listItem: 15,
        }}
        spacing={{
          containerPadding: 16,
          flagMargin: 12,
          callingCodeMargin: 8,
          headerPadding: 20,
          searchMargin: 16,
          listItemMargin: 8,
        }}
        borderRadius={{
          container: 12,
          flag: 16,
          search: 8,
        }}
        shadow={{
          container: true,
          modal: true,
        }}
        elevation={{
          container: 4,
          modal: 8,
        }}
        iconColor="#4CAF50"
        colors={{
          grayLight: '#E0E0E0',
          white: '#FFFFFF',
          grayBackground: '#FAFAFA',
          gray: '#757575',
          dark: '#212121',
        }}
      />
      
      {country && (
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Selected Country Details:</Text>
          <Text style={styles.infoText}>Name: {country.name?.common}</Text>
          <Text style={styles.infoText}>Code: {countryCode}</Text>
          <Text style={styles.infoText}>Calling Code: +{country.callingCode[0]}</Text>
          <Text style={styles.infoText}>Currency: {country.currency[0]}</Text>
          <Text style={styles.infoText}>Region: {country.region}</Text>
          <Text style={styles.infoText}>Subregion: {country.subregion}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  info: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    marginVertical: 4,
  },
});
