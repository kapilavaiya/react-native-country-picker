import { StyleSheet, Platform } from 'react-native';

const defaultColors = {
  GRAY_LIGHT: '#E5E5E5',
  WHITE: '#FFFFFF',
  GRAY_BACKGROUND: '#F5F5F5',
  GRAY: '#999999',
  DARK: '#000000',
};

export const createStyles = (colors?: {
  grayLight?: string;
  white?: string;
  grayBackground?: string;
  gray?: string;
  dark?: string;
}) => {
  const customColors = {
    GRAY_LIGHT: colors?.grayLight || defaultColors.GRAY_LIGHT,
    WHITE: colors?.white || defaultColors.WHITE,
    GRAY_BACKGROUND: colors?.grayBackground || defaultColors.GRAY_BACKGROUND,
    GRAY: colors?.gray || defaultColors.GRAY,
    DARK: colors?.dark || defaultColors.DARK,
  };

  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: customColors.GRAY_LIGHT,
      backgroundColor: customColors.WHITE,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    flagButton: {
      height: 28,
      width: 28,
      borderRadius: 14,
      marginLeft: 12,
    },
    flag: {
      height: 28,
      width: 28,
      borderRadius: 14,
    },
    callingCode: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: '500',
      color: customColors.DARK,
    },
    dropdownIcon: {
      marginRight: 6,
    },

    view: {
      flex: 1,
      backgroundColor: customColors.GRAY_BACKGROUND,
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 12,
      height: 45,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '600',
      color: customColors.DARK,
    },
    close: {
      position: 'absolute',
      right: 0,
      padding: 8,
    },
    searchView: {
      marginTop: 6,
      marginHorizontal: 16,
      marginBottom: 12,
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: customColors.GRAY_LIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      backgroundColor: customColors.WHITE,
    },
    search: {
      height: 40,
      paddingHorizontal: 8,
      fontSize: 16,
      ...(Platform.OS === 'android' && { includeFontPadding: false }),
      color: customColors.DARK,
      width: '85%',
    },
    clearText: {
      position: 'absolute',
      right: 8,
      padding: 4,
    },

    listContainer: {
      marginTop: 8,
    },
    listViewContainer: {
      marginHorizontal: 24,
      marginVertical: 12,
      flex: 1,
    },
    listView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    listIconView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: customColors.DARK,
    },
    other: {
      marginLeft: 24,
      marginVertical: 16,
      fontSize: 16,
      fontWeight: '600',
      color: customColors.DARK,
    },
  });
};

export default createStyles();
