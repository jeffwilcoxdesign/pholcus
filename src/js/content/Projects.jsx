//import React from 'react';
//import ReactDOM from 'react-dom';
export function projects({ React }) {
  return function Projects(props) {
    return Object.assign({}, React.Component.prototype, {
      props,
      render() {
        return (
          <div>
            <p>hello project container!</p>
          </div>
        );
      },
    });
  }
}
