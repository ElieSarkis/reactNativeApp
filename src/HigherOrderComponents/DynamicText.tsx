import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Text } from 'react-native';

import reduce from '../helpers/reduceFunction';
import { languageStoreContext } from '../stores/languageStore';

const DynamicText = observer((props: any) => {
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();
  const {style, children} = props;

  let textStyleLanguage = language === 'AR' ? 'right' : 'left';

  const reduceTextAlign = reduce(() => style.textAlign, 0);

  let newProps = style;

  if (reduceTextAlign && style.textAlign !== 'center') {
    newProps.textAlign = textStyleLanguage;
  }
  return <Text style={{...newProps}}>{children}</Text>;
});
export default DynamicText;
