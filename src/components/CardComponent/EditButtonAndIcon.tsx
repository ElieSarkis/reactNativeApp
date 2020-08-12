import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { colors } from '../../colors/colors';
import DynamicText from '../../HigherOrderComponents/DynamicText';
import DynamicView from '../../HigherOrderComponents/DynamicView';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import { modalStoreContext } from '../../stores/modalStore';
import i18n from '../../texts/i18n';

const HomeImage = require('../../../src/assets/home.png');
const OfficeImage = require('../../../src/assets//office.png');
const OutsideImage = require('../../../src/assets//outside.png');
interface Props {
  item: any;
}

const EditButtonAndIcon: React.FC<Props> = observer(({item}) => {
  const getImage = (tag: string) => {
    switch (tag) {
      case 'Office':
        return OfficeImage;
      case 'Home':
        return HomeImage;
      case 'Outside':
        return OutsideImage;
    }
  };

  const editTask = (id: number) => {
    modalStore.editTaskStore(id);
  };

  const languageStore = useContext(languageStoreContext);
  const modalStore = useContext(modalStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <DynamicView
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
      }}>
      <TouchableOpacity
        style={{
          width: sizes.getWidth(26),
          backgroundColor: colors.grey,
          height: sizes.getHeight(9.5),
          marginTop: sizes.getHeight(4.5),
          borderRadius: sizes.getWidth(2),
        }}
        onPress={() => editTask(item.id)}>
        <DynamicView
          style={{
            alignSelf: 'center',
          }}>
          <DynamicText
            style={{
              paddingTop: sizes.getHeight(1.5),
              fontWeight: 'bold',
              fontSize: sizes.getWidth(4.3),
              color: colors.white,
            }}>
            {i18n.get('EDIT', language)}
          </DynamicText>
        </DynamicView>
      </TouchableOpacity>
      <DynamicView
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: sizes.getHeight(3.5),
          alignSelf: 'center',
          marginLeft: sizes.getWidth(14),
        }}>
        <Image
          source={getImage(item.tag)}
          style={{width: sizes.getWidth(11), height: sizes.getHeight(10)}}
        />
      </DynamicView>
    </DynamicView>
  );
});

export default EditButtonAndIcon;
