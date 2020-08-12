import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { TextInput } from 'react-native';

import { colors } from '../../colors/colors';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import { todoStoreContext } from '../../stores/toDoStore';
import i18n from '../../texts/i18n';

const AddNewTaskScreen: React.FC = observer(() => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <TextInput
      multiline
      numberOfLines={4}
      maxLength={100}
      style={{
        backgroundColor: colors.white,
        width: sizes.getWidth(96),
        alignSelf: 'center',
        marginBottom: sizes.getHeight(4),
        borderColor: colors.grey,
        borderWidth: sizes.getWidth(0.3),
        borderRadius: sizes.getWidth(2),
      }}
      placeholder={i18n.get('ENTER_DESCRIPTION', language)}
      value={todoStore.description.get()}
      onChangeText={data => todoStore.description.set(data)}
      underlineColorAndroid="transparent"
    />
  );
});

export default AddNewTaskScreen;
