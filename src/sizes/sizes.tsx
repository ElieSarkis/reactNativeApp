import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const sizes = {
  getWidth(widthUnits: number) {
    const convertedWidth = (wp('100%') * widthUnits) / 108;
    return convertedWidth;
  },
  getHeight(heightUnits: number) {
    const convertedHeight = (hp('100%') * heightUnits) / 192;
    return convertedHeight;
  },
};
