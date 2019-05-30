import ReactAutosuggest from 'react-autosuggest';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { symbolSearch } from './helpers';

function Autosuggest({ onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  return (
    <ReactAutosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={async ({ value }) =>
        setSuggestions(await symbolSearch(value))
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={suggestion => suggestion.name}
      renderSuggestion={suggestion => <span>{suggestion.name}</span>}
      inputProps={{
        value,
        onChange: (event, { newValue }) => setValue(newValue)
      }}
      onSuggestionSelected={(event, { name, suggestion }) =>
        onChange(suggestion)
      }
    />
  );
}

Autosuggest.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Autosuggest;
