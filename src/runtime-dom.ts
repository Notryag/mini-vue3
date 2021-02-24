export const nodeOps = {
  insert:(child,container:Element,anchor) => {
      if(anchor) {
        container.insertBefore(child,anchor)
      }else {
        container.appendChild(child)
      }
  },
  remove: (child:Element) => {
    const parent = child.parentNode

    if(parent) {
      parent.removeChild(child)
    }
  },

  createElement: tag => document.createElement(tag),

  setElementText: (el:Element,text) => {
    el.textContent = text
  }
}
const onRe = /^on[^a-z]/
const isOn = key => onRe.test(key)
export function hostPatchProps(el:Element,key,prev,next) {
  if(isOn(key)) {
    const name = key.slice(2).toLowerCase()
    prev && el.removeEventListener(name,prev)
    next && el.addEventListener(name,next)
  }else {
    if(next === null) {
      el.removeAttribute(key)
    }else {
      el.setAttribute(key,next)
    }
  }
}