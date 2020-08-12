import { observer } from 'mobx-react';
import React from 'react';

import DynamicView from '../../HigherOrderComponents/DynamicView';
import CardNameDescription from './CardNameDescription';
import DeleteCheckboxText from './DeleteCheckboxText';
import EditButtonAndICon from './EditButtonAndIcon';
import MarkCheckBoxText from './MarkCheckboxText';

interface Props {
  item: any;
}

const CardItem: React.FC<Props> = observer(({item}) => {
  return (
    <DynamicView>
      <CardNameDescription item={item} />
      <MarkCheckBoxText item={item} />
      <EditButtonAndICon item={item} />
      <DeleteCheckboxText item={item} />
    </DynamicView>
  );
});

export default CardItem;
