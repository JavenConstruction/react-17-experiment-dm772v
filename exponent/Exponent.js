import React, { Component, /* PureComponent */ } from 'react';
import ReactDOM from 'react-dom';
//import { Field as  ThemedField } from './../utils';
import { ThemedField } from './../utils';
export default class Exponent extends Component {
//export default class MoiveList extends PureComponent{

  static count = 10;
  constructor(props) {
    super(props);
    this.state = { result: 0, expNo: 1 };
  
  }
  
  /**
   * SPL.Note:  
   * 1. GDSFP tide with state so you should define state as empty object(stateFull component) otherwise warning thrown by React. 
   * 2. GDSFP execute without any props change, because parent render (check: this.props !== nextProps). 
   * 3. Don't forget it's a static method hence you shouldn't use class instance 
   * */
  
  static getDerivedStateFromProps(nxtProps, nxtState) {
    console.log(`GDSP >`, nxtProps, nxtState);
    return {result: Math.pow(nxtProps.baseNo || 0,nxtState.expNo ||0)};
  }
  /* shouldComponentUpdate() {
    return false;
  } */

  expNoHandler({target:{value}}) {
    
    this.setState({
      expNo:value,
      result:Math.pow(this.props.baseNo || 0,value || 0)
    })
  }

  /**
   * GSBU called just before DOM-Update, Helpfull to read DOM before react update vDOM to DOM
   * GSBU called after render (lifecycle method)
   * return value of GSBU send to componentDidUpdate as 3rd param
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    
    // just read from DOM 
    let val = document.getElementById('result').value;
    console.log('GSBU > DOM val result', val);
    return val;
  }
  render() {
    console.log('Exponent render');
    return (
      <div className="container">
        <h1 className="lead"><u>Child A</u></h1>
        <ThemedField  id="expNo" label ="Exponent :" value={this.state.expNo} onChange={this.expNoHandler.bind(this)}/>

        <ThemedField  id="result" label="Result" value={this.state.result} readOnly={true}/>
        {/* Bellow Element attached in Base component. Using ReactDom.Portal, we can change DOM hierarchy  
           Note: As per React philosophy, Base(parent) Component DOM creation will start, Once Exponent(child) component finished DOM creatation.
           So that, basePortalRef filled only on 2nd time component update        
        */
        this.props.basePortalRef.current &&
          ReactDOM.createPortal((<p className="bg-info">Base componet container(div block) used by Exponent Componet using by  React.Portal</p>),this.props.basePortalRef.current)
        }
      </div>
    )
  }
  componentDidUpdate(prvProps,prvState,snapshot) {
    let val = document.getElementById('result').value;
    console.log(`compare on GSBU & CDU current ${val} snapshot val ${snapshot}`);
  }
  componentDidMount(){
  }
}
