import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Modal, TouchableHighlight } from 'react-native';

import { colors } from '../../colors/colors';
import DynamicText from '../../HigherOrderComponents/DynamicText';
import DynamicView from '../../HigherOrderComponents/DynamicView';
import { sizes } from '../../sizes/sizes';
import { languageStoreContext } from '../../stores/languageStore';
import { modalStoreContext } from '../../stores/modalStore';
import i18n from '../../texts/i18n';
import ModalTextHighlight from './ModalTextHighlight';
import ModalTextInput from './ModalTextInput';

export interface Props {
  onPress: () => void;
  onPress2: () => void;
}

const ModalComponent: React.FC<Props> = observer(({onPress, onPress2}) => {
  const languageStore = useContext(languageStoreContext);
  const modalStore = useContext(modalStoreContext);
  const language = languageStore.appMainLanguage.get();

  return (
    <DynamicView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: sizes.getHeight(4),
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStore.modalVisible.get() === true ? true : false}>
        <DynamicView
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: sizes.getHeight(80),
            marginLeft: sizes.getWidth(20),
            maxWidth: sizes.getWidth(70),
          }}>
          <DynamicView
            style={{
              backgroundColor: colors.white,
              borderRadius: sizes.getWidth(2),
              padding: sizes.getWidth(10),
              alignItems: 'center',
              maxWidth: sizes.getWidth(250),
            }}>
            <DynamicText
              style={{
                marginBottom: sizes.getHeight(4),
                textAlign: 'center',
              }}>
              {modalStore.textInsideModal.get()}
            </DynamicText>

            {modalStore.isModalEditMode.get() && <ModalTextInput />}

            <DynamicView
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: sizes.getWidth(0),
              }}>
              <TouchableHighlight
                style={{
                  backgroundColor: colors.lightGrey,
                  borderRadius: sizes.getWidth(4.7),
                  padding: sizes.getWidth(2.5),
                }}
                onPress={onPress2}>
                <DynamicText
                  style={{
                    color: colors.white,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {i18n.get('OKAY', language)}
                </DynamicText>
              </TouchableHighlight>

              {modalStore.isModalEditMode.get() && (
                <ModalTextHighlight onPress={onPress} />
              )}
            </DynamicView>
          </DynamicView>
        </DynamicView>
      </Modal>
    </DynamicView>
  );
});

export default ModalComponent;
