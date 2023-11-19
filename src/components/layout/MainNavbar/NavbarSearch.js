import React, { useState } from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import en from "../../../locales/en.json";

export default props => {
  let [search, setSearch] = useState("");
  let handleInputChange = e => {
    props.func(e.target.value);
    setSearch(e.target.value);
  };
  return (
    <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="material-icons">{en["Search"]}</i>
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          onChange={e => handleInputChange(e)}
          value={search}
          className="navbar-search"
          placeholder="Search for something..."
        />
        <button type="button" onClick={props.btn} className="btn ">
          <i style={{ fontSize: 16 }} className="material-icons">
            search
          </i>
        </button>
      </InputGroup>
    </Form>
  );
};
