import React from 'react';
import ReactDOM from 'react-dom';
require("../../css/content/style.css");

class Hello extends React.Component {
  render() {
    return <h1>Hello Projects</h1>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('React-Container'));
