import React from 'react'
import ReactDOM from 'react-dom'

export const render = async (components: Record<string, any>, wrapperComponent?: any) => {
  const Wrapper = wrapperComponent ?? React.Fragment
  const selected = window.location.search.substring(1)
  const Component = (await components[selected]()).default

  const elem = React.createElement(Wrapper, {}, React.createElement(Component))
  ReactDOM.render(elem, document.querySelector('#app'))
}
