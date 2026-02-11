import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import countriesJSON from './countries-emoji.json';
import { createStyles } from './styles';
import { Country, CountryCode } from './types';

const countriesData: Record<string, Country> = countriesJSON;
const allCountriesData: Country[] = Object.keys(countriesData).map(key => ({
  countryCode: key as CountryCode,
  currency: countriesData[key]?.currency ?? [''],
  callingCode: countriesData[key]?.callingCode ?? [''],
  region: countriesData[key]?.region ?? '',
  subregion: countriesData[key]?.subregion ?? '',
  flag: countriesData[key]?.flag ?? '',
  name: countriesData[key]?.name ?? { common: '' },
}));

interface CountryPickerProps {
  countryCode: CountryCode;
  onSelect: (countryCode: CountryCode, country: Country) => void;
  
  // Colors
  colors?: {
    grayLight?: string;
    white?: string;
    grayBackground?: string;
    gray?: string;
    dark?: string;
  };
  
  // Text customization
  headerText?: string;
  searchPlaceholder?: string;
  otherText?: string;
  
  // Icon customization
  iconColor?: string;
  dropdownIconName?: string;
  dropdownIconSize?: number;
  closeIconName?: string;
  closeIconSize?: number;
  searchIconName?: string;
  searchIconSize?: number;
  clearIconName?: string;
  clearIconSize?: number;
  checkIconName?: string;
  checkIconSize?: number;
  
  // Display options
  showFlag?: boolean;
  showCallingCode?: boolean;
  showCountryName?: boolean;
  flagSize?: number;
  
  // Modal customization
  modalAnimationType?: 'none' | 'slide' | 'fade';
  modalPresentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
  
  // Search customization
  enableSearch?: boolean;
  onSearch?: (searchText: string, filteredCountries: Country[]) => void;
  customSearchFilter?: (item: Country, searchText: string) => boolean;
  
  // Filtering
  excludedCountries?: CountryCode[];
  includedCountries?: CountryCode[];
  customCountryList?: Country[];
  
  // Callbacks
  onOpen?: () => void;
  onClose?: () => void;
  
  // Custom render functions
  renderFlag?: (flagUri: string, style?: StyleProp<ImageStyle>) => React.ReactNode;
  renderCountryName?: (country: Country) => React.ReactNode;
  renderCallingCode?: (callingCode: string) => React.ReactNode;
  renderListItem?: (country: Country, isSelected: boolean, onPress: () => void) => React.ReactNode;
  renderSelectedCountry?: (country: Country) => React.ReactNode;
  
  // Custom styles
  containerStyle?: StyleProp<ViewStyle>;
  flagStyle?: StyleProp<ImageStyle>;
  callingCodeStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  searchInputStyle?: StyleProp<TextStyle>;
  listItemStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  searchContainerStyle?: StyleProp<ViewStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
  selectedItemStyle?: StyleProp<ViewStyle>;
  
  // Typography & Sizing
  fontSize?: {
    callingCode?: number;
    countryName?: number;
    header?: number;
    search?: number;
    listItem?: number;
    otherSection?: number;
  };
  fontWeight?: {
    callingCode?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    countryName?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    header?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  };
  containerHeight?: number;
  containerWidth?: number | string;
  modalMaxHeight?: number;
  listItemHeight?: number;
  
  // Spacing & Layout
  spacing?: {
    containerPadding?: number;
    flagMargin?: number;
    callingCodeMargin?: number;
    headerPadding?: number;
    searchMargin?: number;
    listItemMargin?: number;
    listItemPadding?: number;
  };
  borderRadius?: {
    container?: number;
    flag?: number;
    search?: number;
    listItem?: number;
    modal?: number;
  };
  
  // Border & Shadow
  borderWidth?: {
    container?: number;
    search?: number;
    listItem?: number;
  };
  shadow?: {
    container?: boolean;
    modal?: boolean;
    listItem?: boolean;
  };
  elevation?: {
    container?: number;
    modal?: number;
    listItem?: number;
  };
  
  // Data & Sorting
  preferredCountries?: CountryCode[];
  sortCountries?: 'name' | 'callingCode' | 'region' | 'custom' | 'none';
  customSortFunction?: (a: Country, b: Country) => number;
  groupByRegion?: boolean;
  showRegionHeaders?: boolean;
  showCurrency?: boolean;
  showSubregion?: boolean;
  
  // Behavior
  autoFocusSearch?: boolean;
  closeOnSelect?: boolean;
  scrollToSelected?: boolean;
  highlightSelected?: boolean;
  selectedItemBackgroundColor?: string;
  selectedItemTextColor?: string;
  emptyStateText?: string;
  emptyStateComponent?: React.ReactNode;
  
  // Performance
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  removeClippedSubviews?: boolean;
  updateCellsBatchingPeriod?: number;
  
  // List Configuration
  keyExtractor?: (item: Country, index: number) => string;
  getItemLayout?: (data: Country[] | null | undefined, index: number) => { length: number; offset: number; index: number };
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ItemSeparatorComponent?: React.ComponentType<any> | React.ReactElement | null;
  
  // Accessibility
  accessibilityLabel?: {
    container?: string;
    search?: string;
    closeButton?: string;
    listItem?: (country: Country) => string;
  };
  testID?: {
    container?: string;
    search?: string;
    closeButton?: string;
    modal?: string;
    list?: string;
  };
  
  // Advanced Styling
  theme?: 'light' | 'dark' | 'auto';
  rippleColor?: string; // Android ripple effect
  activeOpacity?: number;
  underlayColor?: string;
  
  // Other options
  disabled?: boolean;
  keyboardVerticalOffset?: number;
  showOtherSection?: boolean;
  otherSectionIndex?: number;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

export const CountryPicker: React.FC<CountryPickerProps> = ({
  countryCode,
  onSelect,
  colors,
  headerText = 'Country/region',
  searchPlaceholder = 'Search country/region',
  otherText = 'Other',
  iconColor = '#000000',
  dropdownIconName = 'keyboard-arrow-down',
  dropdownIconSize = 24,
  closeIconName = 'close',
  closeIconSize = 24,
  searchIconName = 'search',
  searchIconSize = 20,
  clearIconName = 'cancel',
  clearIconSize = 20,
  checkIconName = 'check',
  checkIconSize = 24,
  showFlag = true,
  showCallingCode = true,
  showCountryName = true,
  flagSize = 28,
  modalAnimationType = 'slide',
  modalPresentationStyle = 'fullScreen',
  enableSearch = true,
  onSearch,
  customSearchFilter,
  excludedCountries = [],
  includedCountries,
  customCountryList,
  onOpen,
  onClose,
  renderFlag,
  renderCountryName,
  renderCallingCode,
  renderListItem,
  renderSelectedCountry,
  containerStyle,
  flagStyle,
  callingCodeStyle,
  modalStyle,
  searchInputStyle,
  listItemStyle,
  headerStyle,
  headerTextStyle,
  searchContainerStyle,
  listContainerStyle,
  selectedItemStyle,
  fontSize,
  fontWeight,
  containerHeight,
  containerWidth,
  modalMaxHeight,
  listItemHeight,
  spacing,
  borderRadius,
  borderWidth,
  shadow,
  elevation,
  preferredCountries,
  sortCountries = 'name',
  customSortFunction,
  groupByRegion = false,
  showRegionHeaders = false,
  showCurrency = false,
  showSubregion = false,
  autoFocusSearch = false,
  closeOnSelect = true,
  scrollToSelected = false,
  highlightSelected = true,
  selectedItemBackgroundColor,
  selectedItemTextColor,
  emptyStateText = 'No countries found',
  emptyStateComponent,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 21,
  removeClippedSubviews = true,
  updateCellsBatchingPeriod = 50,
  keyExtractor,
  getItemLayout,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  ItemSeparatorComponent,
  accessibilityLabel,
  testID,
  theme = 'light',
  rippleColor,
  activeOpacity = 0.7,
  underlayColor,
  disabled = false,
  keyboardVerticalOffset = 0,
  showOtherSection = false,
  otherSectionIndex = 3,
  loading = false,
  loadingComponent,
}) => {
  const [openCountryPicker, setOpenCountryPicker] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const styles = useMemo(() => createStyles(colors), [colors]);

  // Filter, sort, and organize countries
  const availableCountries = useMemo(() => {
    let filtered: Country[];
    
    if (customCountryList) {
      filtered = customCountryList;
    } else {
      filtered = allCountriesData;
      if (includedCountries && includedCountries.length > 0) {
        filtered = filtered.filter(country =>
          includedCountries.includes(country.countryCode as CountryCode)
        );
      }
      if (excludedCountries && excludedCountries.length > 0) {
        filtered = filtered.filter(
          country => !excludedCountries.includes(country.countryCode as CountryCode)
        );
      }
    }

    // Sort countries
    if (sortCountries !== 'none') {
      if (sortCountries === 'custom' && customSortFunction) {
        filtered = [...filtered].sort(customSortFunction);
      } else if (sortCountries === 'name') {
        filtered = [...filtered].sort((a, b) =>
          (a.name?.common || '').localeCompare(b.name?.common || '')
        );
      } else if (sortCountries === 'callingCode') {
        filtered = [...filtered].sort((a, b) =>
          (a.callingCode[0] || '').localeCompare(b.callingCode[0] || '')
        );
      } else if (sortCountries === 'region') {
        filtered = [...filtered].sort((a, b) => {
          const regionCompare = (a.region || '').localeCompare(b.region || '');
          if (regionCompare !== 0) return regionCompare;
          return (a.name?.common || '').localeCompare(b.name?.common || '');
        });
      }
    }

    // Move preferred countries to top (keep them sorted alphabetically)
    if (preferredCountries && preferredCountries.length > 0) {
      const preferred = filtered
        .filter(country =>
          preferredCountries.includes(country.countryCode as CountryCode)
        )
        .sort((a, b) =>
          (a.name?.common || '').localeCompare(b.name?.common || '')
        );
      const others = filtered.filter(
        country => !preferredCountries.includes(country.countryCode as CountryCode)
      );
      filtered = [...preferred, ...others];
    }

    return filtered;
  }, [
    customCountryList,
    includedCountries,
    excludedCountries,
    sortCountries,
    customSortFunction,
    preferredCountries,
  ]);

  const [countries, setCountries] = useState<Country[]>(availableCountries);

  const selected = useMemo(
    () => countriesData[countryCode] ?? countriesJSON.BE,
    [countryCode],
  );

  const onSearchCountry = useCallback(
    (text: string) => {
      setSearch(text);
      if (text) {
        let result: Country[];
        if (customSearchFilter) {
          result = availableCountries.filter(item =>
            customSearchFilter(item, text)
          );
        } else {
          result = availableCountries.filter(item => {
            const itemData = item.name?.common?.toLowerCase() ?? '';
            const searchText = text.toLowerCase();
            return itemData.indexOf(searchText) > -1;
          });
        }
        setCountries(result);
        onSearch?.(text, result);
      } else {
        setCountries(availableCountries);
        onSearch?.('', availableCountries);
      }
    },
    [availableCountries, customSearchFilter, onSearch]
  );

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setOpenCountryPicker(true);
    setCountries(availableCountries);
    onOpen?.();
  }, [disabled, availableCountries, onOpen]);

  const handleClose = useCallback(() => {
    setOpenCountryPicker(false);
    onSearchCountry('');
    onClose?.();
  }, [onSearchCountry, onClose]);

  const handleSelect = useCallback(
    (code: CountryCode, country: Country) => {
      onSelect(code, country);
      if (closeOnSelect) {
        handleClose();
      }
    },
    [onSelect, handleClose, closeOnSelect]
  );

  // Create dynamic styles with all the new props
  const dynamicContainerStyle = useMemo(
    () => [
      styles.container,
      containerHeight && { height: containerHeight },
      containerWidth && { width: containerWidth },
      spacing?.containerPadding && { padding: spacing.containerPadding },
      borderRadius?.container && { borderRadius: borderRadius.container },
      borderWidth?.container && { borderWidth: borderWidth.container },
      shadow?.container && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      elevation?.container && Platform.OS === 'android' && {
        elevation: elevation.container,
      },
      containerStyle,
    ],
    [
      styles.container,
      containerHeight,
      containerWidth,
      spacing?.containerPadding,
      borderRadius?.container,
      borderWidth?.container,
      shadow?.container,
      elevation?.container,
      containerStyle,
    ]
  );

  const dynamicModalStyle = useMemo(
    () => [
      styles.view,
      modalMaxHeight && { maxHeight: modalMaxHeight },
      borderRadius?.modal && { borderRadius: borderRadius.modal },
      shadow?.modal && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      elevation?.modal && Platform.OS === 'android' && {
        elevation: elevation.modal,
      },
      modalStyle,
    ],
    [
      styles.view,
      modalMaxHeight,
      borderRadius?.modal,
      shadow?.modal,
      elevation?.modal,
      modalStyle,
    ]
  );

  const dynamicSearchStyle = useMemo(
    () => [
      styles.searchView,
      spacing?.searchMargin && {
        marginTop: spacing.searchMargin,
        marginBottom: spacing.searchMargin,
        marginHorizontal: spacing.searchMargin,
      },
      borderRadius?.search && { borderRadius: borderRadius.search },
      borderWidth?.search && { borderWidth: borderWidth.search },
      searchContainerStyle,
    ],
    [
      styles.searchView,
      spacing?.searchMargin,
      borderRadius?.search,
      borderWidth?.search,
      searchContainerStyle,
    ]
  );

  const dynamicSearchInputStyle = useMemo(
    () => [
      styles.search,
      fontSize?.search && { fontSize: fontSize.search },
      searchInputStyle,
    ],
    [styles.search, fontSize?.search, searchInputStyle]
  );

  const dynamicHeaderStyle = useMemo(
    () => [
      styles.flexView,
      spacing?.headerPadding && { paddingHorizontal: spacing.headerPadding },
      headerStyle,
    ],
    [styles.flexView, spacing?.headerPadding, headerStyle]
  );

  const dynamicHeaderTextStyle = useMemo(
    () => [
      styles.headerText,
      fontSize?.header && { fontSize: fontSize.header },
      fontWeight?.header && { fontWeight: fontWeight.header },
      headerTextStyle,
    ],
    [styles.headerText, fontSize?.header, fontWeight?.header, headerTextStyle]
  );

  const dynamicCallingCodeStyle = useMemo(
    () => [
      styles.callingCode,
      fontSize?.callingCode && { fontSize: fontSize.callingCode },
      fontWeight?.callingCode && { fontWeight: fontWeight.callingCode },
      spacing?.callingCodeMargin && { marginLeft: spacing.callingCodeMargin },
      callingCodeStyle,
    ],
    [
      styles.callingCode,
      fontSize?.callingCode,
      fontWeight?.callingCode,
      spacing?.callingCodeMargin,
      callingCodeStyle,
    ]
  );

  const dynamicListItemStyle = useMemo(
    () => [
      styles.listViewContainer,
      spacing?.listItemMargin && {
        marginHorizontal: spacing.listItemMargin,
        marginVertical: spacing.listItemMargin,
      },
      spacing?.listItemPadding && { padding: spacing.listItemPadding },
      borderRadius?.listItem && { borderRadius: borderRadius.listItem },
      borderWidth?.listItem && { borderWidth: borderWidth.listItem },
      shadow?.listItem && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      elevation?.listItem && Platform.OS === 'android' && {
        elevation: elevation.listItem,
      },
      listItemStyle,
    ],
    [
      styles.listViewContainer,
      spacing?.listItemMargin,
      spacing?.listItemPadding,
      borderRadius?.listItem,
      borderWidth?.listItem,
      shadow?.listItem,
      elevation?.listItem,
      listItemStyle,
    ]
  );

  const dynamicCountryNameStyle = useMemo(
    () => [
      styles.name,
      fontSize?.listItem && { fontSize: fontSize.listItem },
      fontWeight?.countryName && { fontWeight: fontWeight.countryName },
      spacing?.flagMargin && { marginLeft: spacing.flagMargin },
    ],
    [
      styles.name,
      fontSize?.listItem,
      fontWeight?.countryName,
      spacing?.flagMargin,
    ]
  );

  const flagButtonStyle = useMemo(
    () => [
      styles.flagButton,
      {
        height: flagSize,
        width: flagSize,
        borderRadius: borderRadius?.flag ?? flagSize / 2,
      },
      spacing?.flagMargin && { marginLeft: spacing.flagMargin },
      flagStyle,
    ],
    [styles.flagButton, flagSize, borderRadius?.flag, spacing?.flagMargin, flagStyle]
  );

  const flagListStyle = useMemo(
    () => [
      styles.flag,
      {
        height: flagSize,
        width: flagSize,
        borderRadius: borderRadius?.flag ?? flagSize / 2,
      },
    ],
    [styles.flag, flagSize, borderRadius?.flag]
  );

  const renderDefaultFlag = (flagUri: string, style?: StyleProp<ImageStyle>) => (
    <Image style={[flagButtonStyle, style]} source={{ uri: flagUri }} />
  );

  const renderDefaultCountryName = (country: Country) => (
    <Text style={dynamicCountryNameStyle}>
      {country?.name?.common}
      {showCallingCode && country.callingCode[0]
        ? ` (+${country?.callingCode[0]})`
        : ''}
      {showCurrency && country.currency[0] ? ` - ${country.currency[0]}` : ''}
      {showSubregion && country.subregion ? ` (${country.subregion})` : ''}
    </Text>
  );

  const renderDefaultCallingCode = (callingCode: string) => (
    <Text style={dynamicCallingCodeStyle}>
      {callingCode ? `+${callingCode}` : ''}
    </Text>
  );

  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (openCountryPicker && autoFocusSearch && enableSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [openCountryPicker, autoFocusSearch, enableSearch]);

  return (
    <>
      {loading && loadingComponent ? (
        loadingComponent
      ) : (
        <>
          <Pressable
            onPress={handleOpen}
            style={dynamicContainerStyle}
            disabled={disabled}
            accessibilityLabel={accessibilityLabel?.container}
            testID={testID?.container}
            android_ripple={rippleColor ? { color: rippleColor } : undefined}
            activeOpacity={activeOpacity}
            underlayColor={underlayColor}
          >
            {renderSelectedCountry ? (
              renderSelectedCountry(selected)
            ) : (
              <>
                {showFlag &&
                  (renderFlag
                    ? renderFlag(selected?.flag, flagButtonStyle)
                    : renderDefaultFlag(selected?.flag))}
                {showCallingCode &&
                  (renderCallingCode
                    ? renderCallingCode(selected.callingCode[0] || '')
                    : renderDefaultCallingCode(selected.callingCode[0] || ''))}
                {showCountryName && (
                  <Text style={dynamicCountryNameStyle}>
                    {selected?.name?.common}
                  </Text>
                )}
                <MaterialIcons
                  name={dropdownIconName}
                  size={dropdownIconSize}
                  color={iconColor}
                  style={styles.dropdownIcon}
                />
              </>
            )}
          </Pressable>
          <Modal
        visible={openCountryPicker}
        statusBarTranslucent
        animationType={modalAnimationType}
        presentationStyle={modalPresentationStyle}
      >
        <SafeAreaProvider>
          <SafeAreaView style={dynamicModalStyle} testID={testID?.modal}>
            <View style={dynamicHeaderStyle}>
              <Text style={dynamicHeaderTextStyle}>{headerText}</Text>
              <Pressable
                onPress={handleClose}
                style={styles.close}
                accessibilityLabel={accessibilityLabel?.closeButton}
                testID={testID?.closeButton}
              >
                <MaterialIcons
                  name={closeIconName}
                  size={closeIconSize}
                  color={iconColor}
                />
              </Pressable>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              {enableSearch && (
                <View style={dynamicSearchStyle}>
                  <MaterialIcons
                    name={searchIconName}
                    size={searchIconSize}
                    color={colors?.gray || '#999999'}
                  />
                  <TextInput
                    ref={searchInputRef}
                    placeholder={searchPlaceholder}
                    placeholderTextColor={colors?.gray || '#999999'}
                    style={dynamicSearchInputStyle}
                    value={search}
                    onChangeText={text => onSearchCountry(text)}
                    accessibilityLabel={accessibilityLabel?.search}
                    testID={testID?.search}
                  />
                  {search ? (
                    <Pressable
                      style={styles.clearText}
                      onPress={() => onSearchCountry('')}
                    >
                      <MaterialIcons
                        name={clearIconName}
                        size={clearIconSize}
                        color={colors?.gray || '#999999'}
                      />
                    </Pressable>
                  ) : null}
                </View>
              )}
              <FlatList
                data={countries}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                contentContainerStyle={[styles.listContainer, listContainerStyle]}
                renderItem={({ item, index }) => {
                  const isSelected =
                    selected?.callingCode === item?.callingCode;
                  
                  if (renderListItem) {
                    return (
                      <View key={keyExtractor ? keyExtractor(item, index) : index.toString()}>
                        {renderListItem(item, isSelected, () =>
                          handleSelect(item?.countryCode ?? 'BE', item)
                        )}
                      </View>
                    );
                  }

                  const itemStyle = [
                    dynamicListItemStyle,
                    isSelected && highlightSelected && selectedItemStyle,
                    isSelected &&
                      highlightSelected &&
                      selectedItemBackgroundColor && {
                        backgroundColor: selectedItemBackgroundColor,
                      },
                  ];

                  return (
                    <View
                      key={keyExtractor ? keyExtractor(item, index) : index.toString()}
                      style={itemStyle}
                    >
                      <Pressable
                        onPress={() => handleSelect(item?.countryCode ?? 'BE', item)}
                        style={styles.listView}
                        accessibilityLabel={
                          accessibilityLabel?.listItem
                            ? accessibilityLabel.listItem(item)
                            : `${item.name?.common} ${item.callingCode[0] ? `+${item.callingCode[0]}` : ''}`
                        }
                        android_ripple={rippleColor ? { color: rippleColor } : undefined}
                        activeOpacity={activeOpacity}
                      >
                        <View style={styles.listIconView}>
                          {showFlag &&
                            (renderFlag
                              ? renderFlag(item?.flag, flagListStyle)
                              : (
                                  <Image
                                    style={flagListStyle}
                                    source={{ uri: item?.flag }}
                                  />
                                ))}
                          {showCountryName &&
                            (renderCountryName
                              ? renderCountryName(item)
                              : renderDefaultCountryName(item))}
                        </View>
                        {isSelected ? (
                          <MaterialIcons
                            name={checkIconName}
                            size={checkIconSize}
                            color={selectedItemTextColor || iconColor}
                          />
                        ) : null}
                      </Pressable>
                    </View>
                  );
                }}
                keyExtractor={keyExtractor || ((item, index) => item.countryCode || index.toString())}
                getItemLayout={getItemLayout}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={ListFooterComponent}
                ListEmptyComponent={
                  ListEmptyComponent ||
                  (emptyStateComponent || (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                      <Text style={{ color: colors?.gray || '#999999' }}>
                        {emptyStateText}
                      </Text>
                    </View>
                  ))
                }
                ItemSeparatorComponent={ItemSeparatorComponent}
                initialNumToRender={initialNumToRender}
                maxToRenderPerBatch={maxToRenderPerBatch}
                windowSize={windowSize}
                removeClippedSubviews={removeClippedSubviews}
                updateCellsBatchingPeriod={updateCellsBatchingPeriod}
                testID={testID?.list}
              />
            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
        </>
      )}
    </>
  );
};

export default CountryPicker;
