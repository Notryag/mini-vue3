let activeEffect
type Dep = Set<any>
type KeyToDep = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDep>()

export function effect(fn) {
  activeEffect = fn
  fn()
}

export function reactive(target) {
  return new Proxy(target,{
    get(target,key,receiver){
      const res = Reflect.get(target,key,receiver)
      track(target,key)
      return res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target,key,value)
      trigger(target,key)
      return res
    }
  })
}


export function track(target,key) {
  console.log('track')
  let depsMap = targetMap.get(target)
  if(!depsMap){ 
    targetMap.set(target,(depsMap =new Map() ))
  }
  let deps = depsMap.get(key)
  if(!deps) {
    depsMap.set(key,(deps = new Set()))
  } 
  if(activeEffect) {
    deps.add(activeEffect)
  }
}

export function trigger(target,key) {
    console.log('trigger');
    let depsMap = targetMap.get(target) 
    if(!depsMap) {
      return 
    }
    let effects =depsMap.get(key)
    console.log(effects);
    
    effects && effects.forEach(effect => effect())
}