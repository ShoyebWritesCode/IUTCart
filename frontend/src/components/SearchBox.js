import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate, Link } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(query);
    //navigate(query ? `/search?query=${query}` : '/search');
    if (query) {
      navigate({
        pathname: '/search',
        search: `?query=${query}`,
        hash: '#hash', // inject code value into template
      });
    }
    //e.target.reset();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitHandler(e);
    }
  };

  return (
    <Form className="d-flex me-auto">
      <InputGroup className="search-input">
        <FormControl
          type="text"
          name="q"
          className="search-input"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button
          variant="primary"
          type="submit"
          id="button-search"
          //onClick={submitHandler}
        >
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
