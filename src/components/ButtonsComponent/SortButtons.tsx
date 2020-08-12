import { observer } from 'mobx-react';
import React from 'react';

import { colors } from '../../colors/colors';
import DynamicView from '../../HigherOrderComponents/DynamicView';
import { sizes } from '../../sizes/sizes';
import SortAlphabeticallyOne from './TouchableOpacity/TouchableSort/SortAlphabeticallyOne';
import SortByDateOne from './TouchableOpacity/TouchableSort/SortByDateOne';

const SortButtons: React.FC = observer(() => {
  return (
    <DynamicView style={{display: 'flex', flexDirection: 'row'}}>
      <SortByDateOne
        style={{
          width: sizes.getWidth(48),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12),
          alignSelf: 'center',
          marginBottom: sizes.getHeight(7),
          marginLeft: sizes.getWidth(4),
          marginRight: sizes.getWidth(3),
          borderRadius: sizes.getWidth(2),
        }}
      />
      <SortAlphabeticallyOne
        style={{
          width: sizes.getWidth(48),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12),
          alignSelf: 'center',
          marginBottom: sizes.getHeight(7),
          borderRadius: sizes.getWidth(2),
        }}
      />
    </DynamicView>
  );
});

export default SortButtons;
