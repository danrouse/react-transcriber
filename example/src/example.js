var React = require('react');
var ReactDOM = require('react-dom');
var Transcriber = require('react-transcriber');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recognized: '',
			transcribed: '',
		};
	}

	onTranscription(source, recognized, transcribed) {
		this.setState({
			recognized: this.state.recognized + recognized,
			transcribed: this.state.transcribed + transcribed
		});
	}

	clear() {
		this.setState({
			recognized: '',
			transcribed: '',
		});
	}

	render() {
		return (
			<div>
				<div>
					<label htmlFor="standardTrans">Basic</label>
					<Transcriber id="standardTrans" onTranscription={this.onTranscription.bind(this, 'standard')} />
				</div>
				<div>
					<label htmlFor="phoneticTrans">Phonetic</label>
					<Transcriber id="phoneticTrans"
						dataPath="/cmudict.json"
						textStart="🎤 Begin Phonetic Transcription"
						wrapUnknown="<%s>"
						onTranscription={this.onTranscription.bind(this, 'phonetic')} />
				</div>
				<div>
					<label htmlFor="twitchTrans">Twitch</label>
					<Transcriber
						id="twitchTrans"
						dataPath="/twitchface.json"
						textStart="🎤 Begin Twitch Emoji Transcription"
						wrapTokens="<img src='%s'>"
						onTranscription={this.onTranscription.bind(this, 'twitch')} />
				</div>

				<hr />
				<p><label>Recognized:</label><span className="result">{this.state.recognized}</span></p>
				<p><label>Transcribed:</label><span className="result" dangerouslySetInnerHTML={{__html: this.state.transcribed}} /></p>
				{this.state.recognized && <button onClick={this.clear.bind(this)}>× Clear</button>}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
