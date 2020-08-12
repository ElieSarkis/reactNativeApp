import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { colors } from '../colors/colors';
import ButtonsComponent from '../components/ButtonsComponent/ButtonsComponent';
import CardComponent from '../components/CardComponent/CardComponent';
import MatchSorterComponent from '../components/MatchSorterComponent';
import { getAsyncData } from '../helpers/asyncHelperFunctions';
import DynamicText from '../HigherOrderComponents/DynamicText';
import DynamicView from '../HigherOrderComponents/DynamicView';
import { sizes } from '../sizes/sizes';
import { languageStoreContext } from '../stores/languageStore';
import { modalStoreContext } from '../stores/modalStore';
import { todoStoreContext } from '../stores/toDoStore';
import i18n from '../texts/i18n';

const Details: React.FC = observer(() => {
  const languageStore = useContext(languageStoreContext);
  const todoStore = useContext(todoStoreContext);
  const modalStore = useContext(modalStoreContext);
  const language = languageStore.appMainLanguage.get();

  useEffect(() => {
    modalStore.todoStoreUseEffect();
  });

  const deleteButton = async (id: number) => {
    todoStore.deleteButtonStore(id);
  };

  const getAsyncDataHelper = async () => {
    const data = await getAsyncData();
    todoStore.data.set(data);
  };

  useEffect(() => {
    getAsyncDataHelper();
  }, []);

  const swipeoutBtns = (id: number) => {
    return [
      {
        text: 'Delete',
        backgroundColor: colors.red,
        onPress: () => {
          swipeoutBtns;
          deleteButton(id);
        },
      },
    ];
  };

  return (
    <ScrollView>
      <DynamicView
        style={{
          marginTop: 20,
          width: sizes.getWidth(106),
        }}>
        <DynamicText
          style={{
            fontFamily: 'GE_East_ExtraBold',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 30,
            color: colors.grey,
          }}>
          {todoStore.data.get().length
            ? i18n.get('LIST_OF_TASKS', language)
            : i18n.get('NO_TASKS', language)}
        </DynamicText>

        <ButtonsComponent />

        {todoStore.data.get().length > 0 && <MatchSorterComponent />}

        <FlatList
          data={
            todoStore.searchTaskName.get().length > 0
              ? todoStore.filteredSearch.get()
              : todoStore.data.get()
          }
          renderItem={({item}) => {
            return (
              <Swipeout
                autoClose={true}
                right={language === 'ENG' ? swipeoutBtns(item.id) : null}
                left={language === 'AR' ? swipeoutBtns(item.id) : null}>
                <CardComponent item={item} />
              </Swipeout>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </DynamicView>
    </ScrollView>
  );
});

export default Details;
