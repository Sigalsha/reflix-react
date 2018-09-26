import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FontAwesome from 'react-fontawesome';

ReactDOM.render(<App />, document.getElementById('root'));
// React.render(<FontAwesome name='rocket' />, document.body);

// var React = require('react');
// var FontAwesome = require('react-fontawesome');
 
// var MyComponent = React.createClass({
//   render: function () {
//     return (
//       <FontAwesome
//         className='super-crazy-colors'
//         name='rocket'
//         size='2x'
//         spin
//         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
//       />
//     );
//   }
// });