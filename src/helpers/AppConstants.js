import {Dimensions, Platform, StatusBar} from 'react-native';

/**
 * SCREEEN_WIDTH, SCREEEN_HEIGHT
 */
export const {width: SCREEEN_WIDTH, height: SCREEEN_HEIGHT} = Dimensions.get(
  'window',
);

/**
 * Use iPhone8 as base size which is 375 x 667
 */
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = SCREEEN_WIDTH / baseWidth;
const scaleHeight = SCREEEN_HEIGHT / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const IS_IPHONE_X =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (SCREEEN_HEIGHT === 812 || SCREEEN_WIDTH === 812);

export const scaledDimension = size => Math.ceil(size * scale);
export const scaledFontSize = size => Math.ceil(size * scale);
export const scaledToWidthDimension = size => Math.ceil(size * scaleWidth);
export const scaledToHeightDimension = size => Math.ceil(size * scaleHeight);
export const scaledToWidthFontSize = size => Math.ceil(size * scaleWidth);
export const scaledToHeightFontSize = size => Math.ceil(size * scaleHeight);

/**
 * HEADER_HEIGHT INCLUDING STATUSBAR_HEIGHT
 */
export const HEADER_HEIGHT = () => {
  if (Platform.OS === 'ios') {
    if (Platform.isLandscape && !Platform.isPad) {
      return 32;
    } else if (IS_IPHONE_X) {
      return 88;
    } else {
      return 64;
    }
  } else {
    return 56;
  }
};

/**
 * STATUSBAR_HEIGHT
 */
export const STATUSBAR_HEIGHT = (skipAndroid: boolean = false) => {
  if (Platform.OS === 'ios') {
    if (IS_IPHONE_X) {
      return 44;
    } else {
      return 20;
    }
  } else {
    if (skipAndroid) {
      return 0;
    }

    return StatusBar.currentHeight;
  }
};


