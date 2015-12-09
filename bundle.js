require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-transcriber":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Transcriber = (function (_Component) {
	_inherits(Transcriber, _Component);

	function Transcriber(props) {
		_classCallCheck(this, Transcriber);

		_get(Object.getPrototypeOf(Transcriber.prototype), 'constructor', this).call(this, props);

		var compatible = true;
		if (!window.webkitSpeechRecognition) {
			compatible = false;
			console.info('The Transcription component has been disabled because your web browser does not support Speech Recognition.');
		}

		this.recognition = null;
		this.wordTranscriptions = props.data || {};
		this.state = {
			recognized: '',
			transcribed: '',
			compatible: compatible,
			isRecording: false
		};
	}

	_createClass(Transcriber, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;

			if (this.state.compatible) {
				if (this.props.dataPath) {
					(function () {
						var xhr = new XMLHttpRequest();
						xhr.open('get', _this.props.dataPath, true);
						xhr.onreadystatechange = function () {
							if (xhr.readyState === 4) {
								if (xhr.status === 200) {
									_this.wordTranscriptions = JSON.parse(xhr.responseText);
								} else {
									console.log('error');
								}
							}
						};
						xhr.send();
					})();
				}

				this.setupRecognition();
			}
		}
	}, {
		key: 'transcribe',
		value: function transcribe(recognized) {
			var _this2 = this;

			// check if the whole string is in the dictionary
			var noSpaces = recognized.replace(/\s/g, '').toUpperCase();
			if (this.wordTranscriptions[noSpaces]) {
				if (this.props.wrapTokens) {
					return this.props.wrapTokens.replace('%s', this.wordTranscriptions[noSpaces]);
				} else {
					return this.wordTranscriptions[noSpaces];
				}
			}

			// check words
			var buffer = [];
			recognized.split(' ').forEach(function (word) {
				if (!word) {
					buffer.push(' ');return;
				}
				var wordUpper = word.toUpperCase();

				// check if word is in the dictionary
				var transcribed = _this2.wordTranscriptions[wordUpper];

				// if all uppercase, it's probably an acronym
				if (!transcribed && word === wordUpper) {
					transcribed = '';
					for (var i = 0; i < word.length; i++) {
						// append the transcription for each letter-word
						transcribed += _this2.wordTranscriptions[word.charAt(i)] || word.charAt(i);
					}
				}

				// wrap known tokens
				console.log('do we wrap', transcribed, _this2.props.wrapTokens);
				if (transcribed && _this2.props.wrapTokens) {
					console.log('wrapping tokens', transcribed, _this2.props.wrapTokens);
					transcribed = _this2.props.wrapTokens.replace('%s', transcribed);
				}

				// wrap unknown tokens
				if (!transcribed && _this2.props.wrapUnknown) {
					console.log('wrapping unknown', word, _this2.props.wrapUnknown);
					word = _this2.props.wrapUnknown.replace('<', '&lt;').replace('>', '&gt;').replace('%s', word);
				}

				buffer.push(transcribed || word);
			});
			return buffer.join(' ');
		}
	}, {
		key: 'setupRecognition',
		value: function setupRecognition() {
			var recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = false;
			recognition.onend = this.finishRecognition.bind(this);
			recognition.onresult = this.finishRecognition.bind(this);
			this.recognition = recognition;
		}
	}, {
		key: 'beginRecognition',
		value: function beginRecognition() {
			if (this.state.isRecording) {
				this.finishRecognition();
			} else {
				this.recognition.onresult = this.processRecognition.bind(this);
				this.recognition.onend = this.finishRecognition.bind(this);
				this.recognition.start();
				this.setState({
					isRecording: true
				});
			}
		}
	}, {
		key: 'processRecognition',
		value: function processRecognition(event) {
			console.log('processrecog', event.results);

			if (!event.results) {
				this.setState({
					recognized: 'error',
					transcribed: ''
				});
			} else {
				var recognized = event.results[event.results.length - 1][0].transcript;
				var transcribed = this.transcribe(recognized);
				this.setState({
					recognized: event.results.length === 1 ? recognized : this.state.recognized + recognized,
					transcribed: event.results.length === 1 ? transcribed : this.state.transcribed + transcribed
				});

				if (this.props.onTranscription) {
					this.props.onTranscription.call(null, recognized, transcribed);
				}
			}
		}
	}, {
		key: 'finishRecognition',
		value: function finishRecognition(event) {
			this.recognition.onend = this.recognition.onresult = null;
			this.recognition.stop();
			this.setState({
				isRecording: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var buttonText = this.state.compatible ? !this.state.isRecording ? this.props.textStart : this.props.textStop : 'Your browser does not support Speech Recognition.';
			return _react2['default'].createElement(
				'button',
				{ disabled: !this.state.compatible, onClick: this.beginRecognition.bind(this) },
				buttonText
			);
		}
	}]);

	return Transcriber;
})(_react.Component);

exports['default'] = Transcriber;

Transcriber.propTypes = {
	data: _react.PropTypes.object,
	dataPath: _react.PropTypes.string,
	onTranscription: _react.PropTypes.func,
	textStart: _react.PropTypes.string,
	textStop: _react.PropTypes.string,
	textUnsupported: _react.PropTypes.string,
	wrapTokens: _react.PropTypes.string,
	wrapUnknown: _react.PropTypes.string
};

Transcriber.defaultProps = {
	textStart: '🎤 Begin Transcription',
	textStop: '■ Stop Transcription',
	textUnsupported: '⚠ Your browser does not support Speech Recognition.',
	wrapTokens: '',
	wrapUnknown: ''
};
module.exports = exports['default'];

},{"react":undefined}]},{},[]);
