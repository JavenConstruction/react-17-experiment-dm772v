import React from 'react';
import {Consumer} from './ThemeContext';

export function Field({ id, label, value, onChange, readOnly,theme, customRefProp }) {
  return (<div className="form-group row">
    <label htmlFor={id} style={theme} className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-4">
      <input type="number" readOnly={readOnly} ref={customRefProp} className="form-control" id={id} value={value} onChange={onChange} />
    </div>
  </div>)
}

export const ThemedField = applyTheme(Field);

//HOC implemenation
export function applyTheme(WrappedComponent) {
  class ApplyTheme extends React.Component {
    constructor(props){
      super(props);
      this.log('construtor');
    }
    log(msg) {
     // console.log(`ApplyTheme -> ${this.props.label} -> ${msg} `);
    }
    render() {
      return (<React.Fragment>
        {/* Fragment is avoid DOM creation */}
        <Consumer>
          {({theme})=>{
           
            return <WrappedComponent {...this.props} {...{theme}}></WrappedComponent>    
          }}
        </Consumer>
        
      </React.Fragment>);
    }
    componentDidMount(){
      this.log('componentDidMount');
    }
    componentDidUpdate(){
      this.log('componentDidUpdate');
    }
  }
  // debuging purpose, can see displayName as Tag name in ReactDevTool 
  ApplyTheme.displayName = `applyTheme-${WrappedComponent.displayName || WrappedComponent.name || 'Component'}`;
  
  //  return forwardRef  instead of direct Component. 
  return React.forwardRef(function (props,ref) {
    // forwarding orginal ref callback as customRefProp
    return <ApplyTheme {...props} customRefProp={ref}></ApplyTheme>
  })

  //return ApplyTheme;
}