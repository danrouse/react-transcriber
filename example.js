require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var Transcriber = require('react-transcriber');

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);

		this.state = {
			recognized: '',
			transcribed: ''
		};
	}

	_createClass(App, [{
		key: 'onTranscription',
		value: function onTranscription(source, recognized, transcribed) {
			this.setState({
				recognized: this.state.recognized + recognized,
				transcribed: this.state.transcribed + transcribed
			});
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.setState({
				recognized: '',
				transcribed: ''
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					null,
					React.createElement(
						'label',
						{ htmlFor: 'standardTrans' },
						'Basic'
					),
					React.createElement(Transcriber, { id: 'standardTrans', onTranscription: this.onTranscription.bind(this, 'standard') })
				),
				React.createElement(
					'div',
					null,
					React.createElement(
						'label',
						{ htmlFor: 'phoneticTrans' },
						'Phonetic'
					),
					React.createElement(Transcriber, { id: 'phoneticTrans',
						dataPath: './cmudict.json',
						textStart: '🎤 Begin Phonetic Transcription',
						wrapUnknown: '<%s>',
						onTranscription: this.onTranscription.bind(this, 'phonetic') })
				),
				React.createElement(
					'div',
					null,
					React.createElement(
						'label',
						{ htmlFor: 'twitchTrans' },
						'Twitch'
					),
					React.createElement(Transcriber, {
						id: 'twitchTrans',
						dataPath: './twitchface.json',
						textStart: '🎤 Begin Twitch Emoji Transcription',
						wrapTokens: '<img src=\'%s\'>',
						onTranscription: this.onTranscription.bind(this, 'twitch') })
				),
				React.createElement('hr', null),
				React.createElement(
					'p',
					null,
					React.createElement(
						'label',
						null,
						'Recognized:'
					),
					React.createElement(
						'span',
						{ className: 'result' },
						this.state.recognized
					)
				),
				React.createElement(
					'p',
					null,
					React.createElement(
						'label',
						null,
						'Transcribed:'
					),
					React.createElement('span', { className: 'result', dangerouslySetInnerHTML: { __html: this.state.transcribed } })
				),
				this.state.recognized && React.createElement(
					'button',
					{ onClick: this.clear.bind(this) },
					'× Clear'
				)
			);
		}
	}]);

	return App;
})(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-transcriber":undefined}]},{},[1]);
