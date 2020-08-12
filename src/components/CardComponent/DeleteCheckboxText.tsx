import { observer } from 'mobx-react';
import React, { useContext } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';

import DynamicText from '../../HigherOrderComponents/DynamicText';
import DynamicView from '../../HigherOrderComponents/DynamicView';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import { todoStoreContext } from '../../stores/toDoStore';
import i18n from '../../texts/i18n';

interface Props {
  item: any;
}

const DeleteCheckboxText: React.FC<Props> = observer(({item}) => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <DynamicView
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: sizes.getWidth(100),
        marginTop: sizes.getHeight(3),
      }}>
      <CheckBox
        disabled={false}
        value={
          todoStore.deleteBoxPressed.get()
            ? todoStore.checkBoxState.get()
            : item.isSelected
        }
        onValueChange={async () => {
          todoStore.deleteBoxPressed.set(false);
          const elementIndex = todoStore.data
            .get()
            .findIndex(element => element.id.toString() === item.id.toString());
          let newArray2 = [...todoStore.data.get()];
          newArray2[elementIndex] = {
            ...newArray2[elementIndex],
            isSelected: !item.isSelected,
          };
          todoStore.data.set(newArray2);
          try {
            await AsyncStorage.setItem(
              '@list_of_tasks',
              JSON.stringify(newArray2),
            );
          } catch (err) {
            console.log(err);
          }
        }}
      />
      <DynamicText
        style={{
          paddingTop: sizes.getHeight(2),
          color:
            item.priority === 'Low'
              ? 'green'
              : item.priority === 'Medium'
              ? 'orange'
              : 'crimson',
        }}>
        {i18n.get('SELECT_ITEM', language)}
      </DynamicText>
    </DynamicView>
  );
});

export default DeleteCheckboxText;
