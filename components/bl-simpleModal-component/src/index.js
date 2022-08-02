import { useState, useEffect } from 'react';
import { Button, Container, Title } from './subcomponents';
import modalTypes from './modal-types';

export default function SimpleModal({ component, eventHandlers }) {
  const {
    display,
    classList,
    title,
    content,
    type,
    placeholder,
    closeButtonLabel,
    submitButtonLabel,
    closingDuration,
  } = component;
  const { onClose, onSubmit, onInputValueChange } = eventHandlers;

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { rootClasses, modalClasses } = useClasses(classList, isClosing);

  component.closeModal = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false)
      setInputValue('');
    }, closingDuration);
  };

  component.openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    onInputValueChange({ inputValue });
  }, [inputValue]);

  useEffect(() => {
    document.body.classList.toggle('active-modal', isOpen);
  }, [isOpen]);

  if (!display || !isOpen) {
    return null;
  }

  return (
    <div className={ rootClasses }>
      <div className={ modalClasses } style={ { animationDuration: `${ closingDuration }ms` } }>
        <div onClick={ onClose } className="overlay"></div>
        <div className="simple-modal__content">
          <Title content={ title }/>
          { (type === modalTypes.prompt || content) && (
            <Container
              content={ content }
              type={ type }
              inputValue={ inputValue }
              setInputValue={ setInputValue }
              placeholder={ placeholder }
            />
          ) }

          <Button
            type={ type }
            onClose={ onClose }
            onSubmit={ onSubmit }
            inputValue={ inputValue }
            submitButtonLabel={ submitButtonLabel }
            closeButtonLabel={ closeButtonLabel }
          />
        </div>
      </div>
    </div>
  );
}

const useClasses = (classList, isClosing) => {
  const rootClasses = 'bl-customComponent-simple-modal ' + classList.join(' ');
  const modalClasses = ['simple-modal'];

  modalClasses.push(isClosing ? 'close-modal' : 'open-modal');

  return { rootClasses, modalClasses: modalClasses.join(' ') };
};