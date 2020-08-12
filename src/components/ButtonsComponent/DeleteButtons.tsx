import { observer } from 'mobx-react';
import React from 'react';

import { colors } from '../../colors/colors';
import DynamicView from '../../HigherOrderComponents/DynamicView';
import { sizes } from '../../sizes/sizes';
import DeleteAll from './TouchableOpacity/TouchableDelete/DeleteAll';
import DeleteSelected from './TouchableOpacity/TouchableDelete/DeleteSelected';

const DeleteButtons: React.FC = observer(() => {

  return (
    <DynamicView style={{display: 'flex', flexDirection: 'row'}}>
      <DeleteSelected
        style={{
          width: sizes.getWidth(48),
          backgroundColor: colors.grey,
          height: sizes.getHeight(12),
          alignSelf: 'center',
          marginBottom: sizes.getHeight(7),
          marginLeft: sizes.getWidth(3),
          marginRight: sizes.getWidth(3),
          borderRadius: sizes.getWidth(2),
        }}
      />
      <DeleteAll
        style={{
          width: sizes.getWidth(49),
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

export default DeleteButtons;
