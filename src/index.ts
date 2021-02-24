import { nodeOps, hostPatchProps } from './runtime-dom'

export * from './reactivity'
export * from './runtime-dom'

export function render(vnode, container) {
  console.log('render')

  patch(container._vnode || null, vnode, container)
  container._vnode = vnode
}

export function patch(n1, n2, container) {
  console.log('patch');
  if (typeof n2.type === 'string') {
    processElment(n1, n2, container)
  }
}

export function processElment(n1, n2, container) {
  if (n1 == null) {
    mountElement(n2, container)
  } else {
    patchElement(n1, n2, container)
  }
}

function patchElement(n1, n2, contianer) {
  let el = (n2.el = n1.el)
  let oldProps = n1.props
  let newProps = n2.props

  // 比较props
  patchProps(el, n2, oldProps, newProps)

  patchChildren(n1, n2, el)
}

function patchProps(el, n2, oldProps, newProps) {
  if (oldProps !== newProps) {
    // 先对新的进行patch
    for (const key in newProps) {
      const prev = oldProps[key]
      const next = newProps[key]

      hostPatchProps(el, key, prev, next)
    }
    // 剩余的就是old
    for (const key in oldProps) {
      if (!(key in newProps)) {
        hostPatchProps(el, key, oldProps[key], null)
      }
    }
  }
}

function patchChildren(n1, n2, container) {
  const c1 = n1 && n1.children
  const c2 = n2.children
  if (typeof c2.type === 'string') {
    // arr > string
    if (Array.isArray(c1)) {
      unmountChildren(c1)
    }
    //  str > str 
    if (c1 !== c2) {
      nodeOps.setElementText(container, c2)
    }
  } else {
    // str > arr
    if (typeof c1.type === 'string') {
      nodeOps.setElementText(container, '')
      mountChildren(c2, container)
    }
    // arr > arr
    patchKeyedChildren(c1, c2, container)
  }
}

function patchKeyedChildren(c1, c2, container) {
  unmountChildren(c1)
  mountChildren(c2, container)
}

function unmountChildren(children) {  
  for (let i = 0; i < children.length; i++) {
    unmount(children[i].el)
  }
}

function unmount(child) {
  nodeOps.remove(child)
}

function mountElement(vnode, container) {
  const { type, props, children } = vnode
  let el = (vnode.el = nodeOps.createElement(type))

  if (props) {
    for (const key in props) {
      hostPatchProps(el, key, null, props[key])
    }
  }

  if (typeof children === 'string') {
    nodeOps.setElementText(el, children)
  } else if (Array.isArray(children)) {
    mountChildren(children, el)
  }
  nodeOps.insert(el, container, null)
}

function mountChildren(children, el) {
  for (let i = 0; i < children.length; i++) {
    patch(null, children[i], el)
  }
}
