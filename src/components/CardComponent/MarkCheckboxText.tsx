import { observer } from 'mobx-react';
import React, { useContext } from 'react';

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
const CardItem: React.FC<Props> = observer(({item}) => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const language = languageStore.appMainLanguage.get();
  const updateCheckbox = async (id: number, isChecked: boolean) => {
    todoStore.checkBoxFunction(id, isChecked);
  };
  var isTrue = todoStore.markedAllAsDone.get();
  return (
    <DynamicView
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: sizes.getWidth(100),
        alignSelf: 'flex-start',
        marginTop: sizes.getHeight(5),
      }}>
      <CheckBox
        disabled={false}
        value={isTrue ? true : item.isChecked}
        onValueChange={() => updateCheckbox(item.id, item.isChecked)}
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
        {i18n.get('SELECT_TASK_DONE', language)}
      </DynamicText>
    </DynamicView>
  );
});
export default CardItem;
