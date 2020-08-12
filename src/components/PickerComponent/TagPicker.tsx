import { observer } from 'mobx-react';
import React, { useContext } from 'react';

import { Picker } from '@react-native-community/picker';

import { colors } from '../../colors/colors';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import { todoStoreContext } from '../../stores/toDoStore';
import i18n from '../../texts/i18n';

const TagPicker: React.FC = observer(() => {
  const todoStore = useContext(todoStoreContext);
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <Picker
      selectedValue={todoStore.tag.get()}
      style={{
        height: sizes.getHeight(15),
        width: sizes.getWidth(55),
        alignSelf: 'center',
        marginBottom: 20,
        color: colors.grey,
      }}
      onValueChange={itemValue => todoStore.tag.set(itemValue)}>
      <Picker.Item
        label={
          language === 'AR' ? i18n.get('HOME', 'AR') : i18n.get('HOME', 'ENG')
        }
        value="Home"
      />
      <Picker.Item
        label={
          language === 'AR'
            ? i18n.get('OFFICE', 'AR')
            : i18n.get('OFFICE', 'ENG')
        }
        value="Office"
      />
      <Picker.Item
        label={
          language === 'AR'
            ? i18n.get('OUTSIDE', 'AR')
            : i18n.get('OUTSIDE', 'ENG')
        }
        value="Outside"
      />
    </Picker>
  );
});

export default TagPicker;
