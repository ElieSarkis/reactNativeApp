import { observer } from 'mobx-react';
import React, { useContext } from 'react';

import DynamicView from '../../HigherOrderComponents/DynamicView';
import { todoStoreContext } from '../../stores/toDoStore';
import DeleteButtons from './DeleteButtons';
import MarkButtons from './MarkButtons';
import SortButtons from './SortButtons';

const ButtonsComponent: React.FC = observer(() => {
  const todoStore = useContext(todoStoreContext);

  return (
    <DynamicView>
      {todoStore.data.get().length ? (
        <DynamicView>
          <SortButtons />
          <MarkButtons />
          <DeleteButtons />
        </DynamicView>
      ) : null}
    </DynamicView>
  );
});

export default ButtonsComponent;
