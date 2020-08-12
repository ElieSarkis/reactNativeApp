import * as React from 'react';

import { colors } from '../../colors/colors';
import DynamicView from '../../HigherOrderComponents/DynamicView';
import { sizes } from '../../sizes/sizes';
import CardItem from './CardItem';

export interface Props {
  item: any;
}

const CardComponent: React.FC<Props> = ({item}) => {
  return (
    <DynamicView
      style={{
        borderRadius: sizes.getWidth(2),
        elevation: sizes.getWidth(0.8),
        backgroundColor: colors.white,
        marginHorizontal: sizes.getWidth(1),
        marginVertical: sizes.getHeight(1.2),
      }}>
      <DynamicView
        style={{
          marginHorizontal: sizes.getWidth(5.8),
          marginVertical: sizes.getHeight(5.8),
        }}>
        <CardItem item={item} />
      </DynamicView>
    </DynamicView>
  );
};

export default CardComponent;
