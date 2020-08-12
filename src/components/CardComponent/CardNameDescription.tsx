import { observer } from 'mobx-react';
import React, { useContext } from 'react';

import reduce from '../../helpers/reduceFunction';
import DynamicText from '../../HigherOrderComponents/DynamicText';
import DynamicView from '../../HigherOrderComponents/DynamicView';
import { languageStoreContext } from '../../stores/languageStore';

interface Props {
  item: any;
}

const CardNameDescription: React.FC<Props> = observer(({item}) => {
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();
  const descriptionLength = reduce(() => item.description.length, 0);

  const nameDescriptionTextAr =
    item.description +
    ' ' +
    (item.description && descriptionLength > 0 ? '- ' : '') +
    item.task +
    '' +
    ' :' +
    '(' +
    item.id +
    ')';

  const nameDescriptionTextEng =
    '(' +
    item.id +
    '): ' +
    item.task +
    (descriptionLength > 0 ? '- ' + item.description : '');

  return (
    <DynamicView
      style={{
        alignItems: 'flex-start',
      }}>
      <DynamicText
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          textDecorationLine: item.isChecked ? 'line-through' : null,
          color:
            item.priority === 'Low'
              ? 'green'
              : item.priority === 'Medium'
              ? 'orange'
              : 'crimson',
        }}>
        {language === 'AR' ? nameDescriptionTextAr : nameDescriptionTextEng}
      </DynamicText>
    </DynamicView>
  );
});

export default CardNameDescription;
