import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { View } from 'react-native';

import reduce from '../helpers/reduceFunction';
import { languageStoreContext } from '../stores/languageStore';

const DynamicView = observer((props: any) => {
  const languageStore = useContext(languageStoreContext);
  const language = languageStore.appMainLanguage.get();
  const {style, children} = props;

  let styleLanguage = language === 'AR' ? 'flex-end' : 'flex-start';
  let flexStyle = language === 'AR' ? 'row-reverse' : 'row';

  const justifyContentLength = reduce(() => style.justifyContent.length, 0);
  const reduceAlignItems = reduce(() => style.alignItems, 0);
  const reduceAlignSelf = reduce(() => style.alignSelf, 0);
  const reduceFlexDirection = reduce(() => style.flexDirection, 0);

  let newProps = style;

  if (justifyContentLength) {
    newProps.justifyContent = styleLanguage;
  }
  if (reduceAlignItems && style.alignItems !== 'center') {
    newProps.alignItems = styleLanguage;
  }
  if (reduceAlignSelf && style.alignSelf !== 'center') {
    newProps.alignSelf = styleLanguage;
  }
  if (reduceFlexDirection && style.flexDirection !== 'center') {
    newProps.flexDirection = flexStyle;
  }
  return <View style={{...newProps}}>{children}</View>;
});
export default DynamicView;
