import { useMemo } from 'react';
import { useWindowDimensions, StyleSheet, Platform } from 'react-native';

const useStyles = () => {
  const { height, width } = useWindowDimensions();
  const vh = height / 100;
  const vw = width / 100;
  const vmin = Math.min(height, width) / 100;

  return useMemo(() => {
    const isLargeScreen = width >= 768;
    const isMediumScreen = width > 675 && width < 768;
    const isSmallScreen = width <= 675;

    return StyleSheet.create({
      // inputs, checkboxes & searchbars
      inputContainer: {
        marginBottom: vmin * 4.5,
      },
      input: {
        backgroundColor: 'transparent',
        paddingVertical: vmin * 0.5,
        marginBottom: vmin * 4.5,
      },
      checkbox: {
        height: isLargeScreen ? vmin * 7 : vmin * 12,
        flexDirection: 'row',
        marginVertical: isLargeScreen ? vmin * 1.5 : vmin * 3,
        padding: isLargeScreen ? vmin * 1.5 : vmin * 3,
        borderRadius: 12,
        borderWidth: 1,
        width: isLargeScreen ? '80%' : '100%',
        alignSelf: 'center',
      },
      searchbar: {
        height: isLargeScreen ? vmin * 6 : vmin * 10,
        borderRadius: 20,
        justifyContent: 'center',
        borderWidth: 1,
        overflow: 'hidden',
        width: '100%',
        alignSelf: 'center',
      },
      datePressable: {
        paddingVertical: vmin * 2,
        paddingHorizontal: vmin * 3,
        borderRadius: 8,
      },

      // buttons
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        paddingVertical: isLargeScreen ? vmin * 1 : vmin * 1.5,
        paddingHorizontal: isLargeScreen ? vmin * 1.5 : vmin * 2,
        marginVertical: vmin * 2.5,
        alignSelf: 'center',
        backgroundColor: '#7BB1FF',
        minWidth: 130,
      },
      buttonText: {
        fontSize: isLargeScreen ? 13 + vmin * 1 : 8 + vmin * 2.5,
        color: 'rgb(18, 20, 22)',
      },
      flexButtonContainer: {
        flexDirection: 'row',
        marginTop: vmin * 2.5,
        gap: vmin * 3,
      },
      fab: {
        position: 'absolute',
        right: 0,
        bottom: vmin * 3.5,
        margin: vmin * 3.5,
      },
      segmentedButtons: {
        width: '100%',
        alignSelf: 'center',
      },

      // text
      bigText: {
        fontSize: isLargeScreen ? 10 + vmin * 2 : 10 + vmin * 3,
      },
      smallText: {
        fontSize: isLargeScreen ? 5 + vmin * 1.3 : 5 + vmin * 2.3,
      },
      mediumText: {
        fontSize: isLargeScreen ? 7 + vmin * 1.5 : 7 + vmin * 2.3,
      },
      errorText: {
        marginTop: isLargeScreen ? 10 + vmin * 1.5 : 10 + vmin * 3.5,
        fontSize: 8 + vmin * 1.8,
      },
      userMessage: {
        fontSize: isLargeScreen ? 7 + vmin * 1.5 : 7 + vmin * 2.5,
        textAlign: 'center',
        marginVertical: vmin * 3.5,
      },

      // containers
      container: {
        width: isLargeScreen ? '60%' : '100%',
      },
      scrollContainer: {
        justifyContent: 'center',
        paddingHorizontal: vw * (isLargeScreen ? 10 : 4),
        paddingVertical: vh * (isLargeScreen ? 4 : 3),
      },
      flexContainer: {
        flex: 1,
        justifyContent: 'flex-start',
      },
      itemContainer: {
        width: Platform.OS === 'web' ? vmin * 39 : vmin * 45,
        gap: vmin * 1,
        padding: vmin * 2.6,
        borderRadius: 12,
        overflow: 'hidden',
      },
      iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: vmin * 1.5,
      },
      listContainer: {
        padding: vmin * 2.5,
        alignItems: 'center',
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isLargeScreen ? vmin * 1 : vmin * 1.5,
      },
      equipmentItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: isLargeScreen ? vmin * 1 : vmin * 1.8,
        paddingHorizontal: isLargeScreen ? vmin * 2.5 : vmin * 3.5,
        borderRadius: 6,
        margin: vmin * 1,
      },
      roomDescriptionContainer: {
        padding: isLargeScreen ? vmin * 3 : vmin * 4.5,
        borderRadius: 12,
        margin: vmin * 1.5,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: isLargeScreen ? vw * 10 : vw * 5,
        paddingVertical: isLargeScreen ? vh * 5 : vh * 2,
      },
      bookingItemContainer: {
        padding: vmin * 4.5,
        borderRadius: 12,
        // ...shadows.light,
        margin: vmin * 4,
        marginHorizontal: isLargeScreen ? vmin * 10 : vmin * 4,
        gap: vmin * 2,
        width: isLargeScreen ? '40%' : '100%',
        alignSelf: 'center',
      },
      bookingItemDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: vmin * 2,
        marginBottom: vmin * 2,
        maxWidth: '90%',
      },
      pickerContainer: {
        width: isLargeScreen ? '60%' : '100%',
        alignSelf: 'center',
        padding: vmin * 2,
        marginBottom: vmin * 3,
      },
      textContainer: {
        marginBottom: vmin * 2,
      },
      userMessageContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: vmin * 2,
        marginVertical: vmin * 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: isLargeScreen ? '60%' : '100%',
        alignSelf: 'center',
      },
      roomLinkContainer: {
        margin: vmin * 2,
      },

      // headings
      heading: {
        fontSize: isLargeScreen ? 12 + vmin * 4 : 14 + vmin * 4,
        marginVertical: isLargeScreen ? vmin * 1 : vmin * 3,
      },
      subheading: {
        fontSize: isLargeScreen ? 12 + vmin * 2 : 14 + vmin * 2,
        marginVertical: isLargeScreen ? vmin * 1 : vmin * 3,
      },

      // images & icons
      userIconContainer: {
        alignItems: 'center',
        marginBottom: vmin * 3,
      },
      roomItemImage: {
        height: isSmallScreen
          ? vmin * 25
          : isMediumScreen
            ? vmin * 20
            : isLargeScreen
              ? vmin * 20
              : vmin * 20,
        borderRadius: 12,
      },
      roomViewImage: {
        width: '100%',
        height: vmin * 50,
        borderRadius: 12,
        marginVertical: isLargeScreen ? vmin * 1 : vmin * 3,
      },

      // overlays
      loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      },

      // cards, blocks, separators
      bookingDetailsCard: {
        borderRadius: 12,
        padding: isLargeScreen ? vmin * 4 : vmin * 3,
        margin: isLargeScreen ? vmin * 4 : vmin * 3,
        width: isLargeScreen ? '60%' : '100%',
      },
      timeSlot: {
        height: 25,
        borderTopWidth: 1,
        position: 'relative',
      },
      selectedTimeSlot: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        width: '80%',
        padding: vmin * 0.7,
      },
      separator: {
        width: 1,
        position: 'absolute',
        left: '20%',
        height: '100%',
      },

      // text links
      settingsLink: {
        borderBottomWidth: 1,
        paddingVertical: vmin * 2.5,
        width: '100%',
        marginBottom: vmin * 2,
        alignItems: 'center',
      },

      // pickers
      picker: {
        width: '100%',
        fontSize: isLargeScreen ? vmin * 3 : vmin * 4.5,
        padding: 15,
      },
    });
  }, [vh, vmin, vw, width]);
};

export default useStyles;
