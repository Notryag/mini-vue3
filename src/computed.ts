import { effect, track, trigger } from "./reactivity"

export function computed(fn) {
  let dirty = true
  let value 

  const runner = () => effect(fn, {
    lazy:true,
    scheduler: () => {
      if(!dirty) {
        dirty = true
        trigger(_computed,'value')
      }
    }
  })

  const _computed = {
    get value() {
      if(dirty) {
        value = runner()
        dirty = false
      }
      track(_computed,'value')
      return  value
    }
  }
  return _computed
}