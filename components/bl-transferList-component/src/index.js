import { useEffect, useMemo, useState } from 'react';

import { validate } from './helpers/validate';
import { List } from './list';
import { TransferButtons } from './transfer-buttons';

export default function TransferListComponent({ component, eventHandlers }) {
  const { display, listType, leftItems, rightItems, iconColor, classList } = component;

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [allSelected, setAllSelected] = useState([]);
  const classes = useTransferListClasses(classList);

  useEffect(() => {
    setLeft(validate(leftItems));
    setRight(validate(rightItems));
  }, [leftItems, rightItems]);

  const leftSelected = left.filter(item => allSelected.includes(item));
  const rightSelected = right.filter(item => allSelected.includes(item));

  if (!display) {
    return null;
  }

  return (
    <div className={ classes }>
      <List
        title="Choices"
        iconColor={ iconColor }
        enableSelectAll={ listType === 'enhanced' }
        items={ left }
        selected={ leftSelected }
        allSelected={ allSelected }
        setAllSelected={ setAllSelected }
      />
      <TransferButtons
        enableMoveAll={ listType !== 'enhanced' }
        allSelected={ allSelected }
        left={ left }
        right={ right }
        leftSelected={ leftSelected }
        rightSelected={ rightSelected }
        setAllSelected={ setAllSelected }
        setLeft={ setLeft }
        setRight={ setRight }
        eventHandlers={ eventHandlers }
      />
      <List
        title="Chosen"
        iconColor={ iconColor }
        enableSelectAll={ listType === 'enhanced' }
        items={ right }
        selected={ rightSelected }
        allSelected={ allSelected }
        setAllSelected={ setAllSelected }
      />
    </div>
  );
};

const useTransferListClasses = classList => {
  const classes = useMemo(() => {
    const classesArray = ['bl-customComponent-transferList', ...classList];

    return classesArray.join(' ');
  }, [classList]);

  return classes;
};
