import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { BasicExample } from './BasicExample';
import { CustomStyledExample } from './CustomStyledExample';
import { MinimalExample } from './MinimalExample';
import { PreferredCountriesExample } from './PreferredCountriesExample';
import { DarkThemeExample } from './DarkThemeExample';
import { FullFeaturedExample } from './FullFeaturedExample';
import { FilteredExample } from './FilteredExample';

type ExampleType = 
  | 'basic'
  | 'custom'
  | 'minimal'
  | 'preferred'
  | 'dark'
  | 'full'
  | 'filtered';

export const ExamplesGallery = () => {
  const [selectedExample, setSelectedExample] = useState<ExampleType>('basic');

  const renderExample = () => {
    switch (selectedExample) {
      case 'basic':
        return <BasicExample />;
      case 'custom':
        return <CustomStyledExample />;
      case 'minimal':
        return <MinimalExample />;
      case 'preferred':
        return <PreferredCountriesExample />;
      case 'dark':
        return <DarkThemeExample />;
      case 'full':
        return <FullFeaturedExample />;
      case 'filtered':
        return <FilteredExample />;
      default:
        return <BasicExample />;
    }
  };

  const examples = [
    { key: 'basic', label: 'Basic' },
    { key: 'custom', label: 'Custom Styled' },
    { key: 'minimal', label: 'Minimal' },
    { key: 'preferred', label: 'Preferred Countries' },
    { key: 'dark', label: 'Dark Theme' },
    { key: 'full', label: 'Full Featured' },
    { key: 'filtered', label: 'Filtered' },
  ] as const;

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContent}
      >
        {examples.map((example) => (
          <TouchableOpacity
            key={example.key}
            onPress={() => setSelectedExample(example.key as ExampleType)}
            style={[
              styles.tab,
              selectedExample === example.key && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedExample === example.key && styles.activeTabText,
              ]}
            >
              {example.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.exampleContainer}>
        {renderExample()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    maxHeight: 60,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  exampleContainer: {
    flex: 1,
  },
});
