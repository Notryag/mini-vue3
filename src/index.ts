import {nodeOps,hostPatchProps} from './runtime-dom'

export * from './reactivity'
export * from './runtime-dom'

export function render(vnode, container) {
  console.log('render');
  
  patch(container._vnode|| null , vnode, container)
  container._vnode = vnode
}

export function patch(n1,n2,container){
  if(typeof n2.type === 'string') {
    processElment(n1,n2,container)
  }
}

export function processElment(n1,n2,container) {
  if(n1 == null) {
    mountElement(n2,container)
  } else {
    patchElement(n1,n2,container)
  }
}

function patchElement(n1,n2,contianer) {
  
}

function mountElement(vnode,container) {
  const { type,props,children} = vnode
  let el = (vnode.el = nodeOps.createElement(type))

  if(props) {
    for( const key in props) {
      hostPatchProps(el,key,null, props[key])
    }
  }

  if(typeof children ==='string') {
    nodeOps.setElementText(el,children)  
  }else if(Array.isArray(children)){
    mountChildren(children,el)
  }
  nodeOps.insert(el, container,null)
}

function mountChildren(children,el) {
  for (let i = 0; i < children.length; i++) {
    patch(null, children[i], el)
  }
}
