import { observer } from 'mobx-react';
import React, { useContext } from 'react';

import { Picker } from '@react-native-community/picker';

import { colors } from '../../colors/colors';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import { todoStoreContext } from '../../stores/toDoStore';
import i18n from '../../texts/i18n';

const PriorityPicker: React.FC = observer(() => {
  const todoStore = useContext(todoStoreContext);
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <Picker
      selectedValue={todoStore.priority.get()}
      style={{
        height: sizes.getHeight(20),
        width: sizes.getWidth(55),
        alignSelf: 'center',
        color: colors.grey,
      }}
      onValueChange={itemValue => todoStore.priority.set(itemValue)}>
      <Picker.Item
        label={
          language === 'AR' ? i18n.get('LOW', 'AR') : i18n.get('LOW', 'ENG')
        }
        value="Low"
      />
      <Picker.Item
        label={
          language === 'AR'
            ? i18n.get('MEDIUM', 'AR')
            : i18n.get('MEDIUM', 'ENG')
        }
        value="Medium"
      />
      <Picker.Item
        label={
          language === 'AR' ? i18n.get('HIGH', 'AR') : i18n.get('HIGH', 'ENG')
        }
        value="Critical"
      />
    </Picker>
  );
});

export default PriorityPicker;
