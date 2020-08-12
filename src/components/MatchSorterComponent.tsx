import matchSorter from 'match-sorter';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { TextInput } from 'react-native';

import { colors } from '../colors/colors';
import { sizes } from '../sizes/sizes';
import { languageStoreContext } from '../stores/languageStore';
import { todoStoreContext } from '../stores/toDoStore';
import i18n from '../texts/i18n';

const MatchSorterComponent: React.FC = observer(() => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <TextInput
      placeholder={i18n.get('ENTER_TASK_NAME', language)}
      value={todoStore.searchTaskName.get()}
      onChangeText={data => {
        todoStore.searchTaskName.set(data);
        const result = matchSorter(todoStore.data.get(), data, {
          keys: ['task'],
        });
        todoStore.filteredSearch.set(result);
      }}
      underlineColorAndroid="transparent"
      style={{
        height: sizes.getHeight(13),
        borderColor: colors.grey,
        borderWidth: 1,
        alignSelf: 'center',
        width: sizes.getWidth(93),
        marginBottom: sizes.getHeight(6),
        borderRadius: sizes.getWidth(3),
        backgroundColor: colors.white,
        minHeight: sizes.getHeight(12),
      }}
    />
  );
});

export default MatchSorterComponent;
