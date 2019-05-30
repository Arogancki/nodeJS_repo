import React from 'react';
import { Wrapper } from './Styles';

export default function withDeleteButton(Component, handler) {
  if (typeof handler !== typeof (_ => {})) {
    handler = () => console.warn('delete handler not defined');
  }
  return function DeleteButton(props) {
    return (
      <Wrapper>
        <i className="material-icons" onClick={handler}>
          delete
        </i>
        <Component {...props} />
      </Wrapper>
    );
  };
}
