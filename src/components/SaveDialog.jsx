import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../proptypes';

class SaveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  change(event) {
    const name = event.target.value;
    this.setState({name});
  }

  onSave(event) {
    event.preventDefault();
    this.props.onSave(this.state.name);
    this.setState({name: ''});
  }

  render() {
    const {name} = this.state;
    return (
      <form onSubmit={event => this.onSave(event)}>
        <label>
          Cycle name
          <input
            type="text"
            required
            value={name}
            onChange={event => this.change(event)}
          />
        </label>
        <button type="submit">Save cycle</button>
      </form>
    );
  }
}

SaveDialog.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SaveDialog;
