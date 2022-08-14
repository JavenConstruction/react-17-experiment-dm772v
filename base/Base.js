import React, { Component } from 'react';
import "./Base.css";

import Exponent from './../exponent/Exponent';
import { applyTheme, Field } from './../utils';

export default class Base extends Component {

  constructor(props) {
    super(props);

    this.state = { baseNo: 1};
    // do HOC intergration in constructor not in render.
    this.ThemedField = applyTheme(Field);

    this.baseElementRef = React.createRef(); // Experiment 3
    this.portalRef = React.createRef(); // Experiment 4
  }


  baseNoHandler(evt) {
    this.setState(
      { baseNo: (evt.target.value) }
    )
  }
  focusToBaseField() {
    this.baseElementRef.current.focus();
  }

  render() {
   // let ThemedField = applyTheme(Field);
    let ThemedField = this.ThemedField;
    return (
      <div className="app container">
        <div ref={this.portalRef}> Wait for Magic. </div>
        <h1 className="lead"><u>APP</u></h1>
          <button className="btn btn-default" onClick={this.focusToBaseField.bind(this)}>Focus Base Field</button>
          {/*  Assigning Ref to HOC is bit different. /bcos ref is not like props  */}
          <ThemedField id="baseNo" label="Base No" value={this.state.baseNo} ref={this.baseElementRef} onChange={this.baseNoHandler.bind(this)}></ThemedField>
          <Exponent basePortalRef={this.portalRef} baseNo={this.state.baseNo}></Exponent>
      </div>
    )
  }
}
