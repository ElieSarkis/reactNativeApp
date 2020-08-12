import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { TouchableHighlight } from 'react-native';

import { colors } from '../../colors/colors';
import DynamicText from '../../HigherOrderComponents/DynamicText';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import i18n from '../../texts/i18n';

export interface Props {
  onPress: () => void;
}

const ModalTextHighlight: React.FC<Props> = observer(({onPress}) => {
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <TouchableHighlight
      style={{
        backgroundColor: colors.lightGrey,
        borderRadius: sizes.getWidth(4.7),
        padding: sizes.getWidth(2.5),
        marginLeft: sizes.getWidth(3),
      }}
      onPress={onPress}>
      <DynamicText
        style={{color: colors.white, fontWeight: 'bold', textAlign: 'center'}}>
        {' '}
        {i18n.get('CANCEL', language)}
      </DynamicText>
    </TouchableHighlight>
  );
});

export default ModalTextHighlight;
