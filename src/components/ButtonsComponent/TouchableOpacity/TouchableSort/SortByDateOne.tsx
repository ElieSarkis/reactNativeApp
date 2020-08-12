import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import { colors } from '../../../../colors/colors';
import DynamicText from '../../../../HigherOrderComponents/DynamicText';
import DynamicView from '../../../../HigherOrderComponents/DynamicView';
import { sizes } from '../../../../sizes/sizes';
import { languageStoreContext } from '../../../../stores/languageStore';
import { todoStoreContext } from '../../../../stores/toDoStore';
import i18n from '../../../../texts/i18n';

interface Props {
  style: object;
}

const SortByDateOne: React.FC<Props> = observer(({style}) => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const language = languageStore.appMainLanguage.get();

  const sortByDate = () => {
    todoStore.sortByDateStore();
  };

  return (
    <TouchableOpacity style={style} onPress={sortByDate}>
      <DynamicView style={{alignSelf: 'center'}}>
        <DynamicText
          style={{
            paddingTop: sizes.getHeight(2),
            fontFamily: 'GE_East_ExtraBold',
            fontSize: sizes.getWidth(4.9),
            color: colors.white,
          }}>
          {i18n.get('SORT_BY_DATE', language)}
          {todoStore.ascOrDesc.get()}
        </DynamicText>
      </DynamicView>
    </TouchableOpacity>
  );
});

export default SortByDateOne;
