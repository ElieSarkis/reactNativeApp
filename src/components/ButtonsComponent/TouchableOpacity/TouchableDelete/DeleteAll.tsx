import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { colors } from '../../../../colors/colors';
import DynamicText from '../../../../HigherOrderComponents/DynamicText';
import { sizes } from '../../../../sizes/sizes';
import { languageStoreContext } from '../../../../stores/languageStore';
import { todoStoreContext } from '../../../../stores/toDoStore';
import i18n from '../../../../texts/i18n';
import { dataType } from '../../../../types/types';

interface Props {
  style: object;
}

const ButtonsComponent: React.FC<Props> = observer(({style}) => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <TouchableOpacity
      style={style}
      onPress={async () => {
        let newData: dataType[] = [];
        todoStore.data.set(newData);
        try {
          await AsyncStorage.setItem('@list_of_tasks', JSON.stringify(newData));
        } catch (err) {
          console.log(err);
        }
      }}>
      <View style={{alignSelf: 'center'}}>
        <DynamicText
          style={{
            paddingTop: sizes.getHeight(2),
            fontFamily: 'GE_East_ExtraBold',
            fontSize: sizes.getWidth(4.9),
            color: colors.white,
          }}>
          {i18n.get('DELETE_ALL', language)}
        </DynamicText>
      </View>
    </TouchableOpacity>
  );
});

export default ButtonsComponent;
