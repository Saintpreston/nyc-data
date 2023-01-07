import React from 'react'
import ReactDOM from 'react-dom'


interface IProps {
 children: JSX.Element;

}

function Portal(props: IProps) {

 const {children} = props

  return ReactDOM.createPortal(children, document.getElementById('tooltip-layer')!)
}

export default Portal