import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { TextInput } from 'react-native';

import { colors } from '../../colors/colors';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import { modalStoreContext } from '../../stores/modalStore';
import i18n from '../../texts/i18n';

const ModalTextInput: React.FC = observer(() => {
  const languageStore = useContext(languageStoreContext);
  const modalStore = useContext(modalStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <TextInput
      multiline
      style={{
        backgroundColor: colors.white,
        maxWidth: sizes.getWidth(65),
        width: sizes.getWidth(65),
        alignSelf: 'center',
        marginBottom: sizes.getHeight(4),
        borderColor: colors.grey,
        borderWidth: sizes.getWidth(0.3),
      }}
      placeholder={i18n.get('UPDATE_TASK', language)}
      value={modalStore.updatedToDoTask.get()}
      onChangeText={data => modalStore.updatedToDoTask.set(data)}
      underlineColorAndroid="transparent"
    />
  );
});

export default ModalTextInput;
