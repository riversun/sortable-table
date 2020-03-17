/**
 * Helper class to name event listener and make it easier to delete
 */
export default class ListenerManager {
  constructor() {
    // this.listeners={ele1:{'click':[func1,func2]},ele2:{'click':[func1,func2]}}
    this.listeners = new Map();
    this.listenerNum = 0;
  }

  addListener(domElement, eventType, listener, listenerName) {
    const result = {
      listenerName: null,
      success: true,
    };
    domElement.addEventListener(eventType, listener);
    let listenerMapForEle = this.listeners.get(domElement);// returns Map
    if (!listenerMapForEle) {
      listenerMapForEle = new Map();
      this.listeners.set(domElement, listenerMapForEle);
    }
    let listenerFuncsForName = listenerMapForEle.get(eventType);// returns Map
    if (!listenerFuncsForName) {
      listenerFuncsForName = new Map();
      listenerMapForEle.set(eventType, listenerFuncsForName);
    }

    if (typeof listenerName !== 'undefined') {
      listenerFuncsForName.set(listenerName, listener);
      result.listenerName = listenerName;
    } else {
      const randomListenerName = `listener-${this.listenerNum}`;
      listenerFuncsForName.set(randomListenerName, listener);
      result.listenerName = randomListenerName;
      this.listenerNum += 1;
    }
    return result;
  }

  removeListener(domElement, eventType, listenerName) {
    const result = {
      success: false,
      message: 'unknown error',
    };
    const listenerMapForEle = this.listeners.get(domElement);// returns map
    if (!listenerMapForEle) {
      result.message = `DOM element ${domElement}(id=${domElement.id}) doesn't have any listeners.`;
      return result;
    }
    const listenerFuncsForName = listenerMapForEle.get(eventType);// returns map
    if (!listenerFuncsForName) {
      result.message = `DOM element ${domElement}(id=${domElement.id}) doesn't have "${eventType}" listeners.`;
      return result;
    }
    const listenerFunc = listenerFuncsForName.get(listenerName);
    if (!listenerFunc) {
      result.message = `DOM element ${domElement}(id=${domElement.id}) doesn't have "${eventType}" listener "${listenerName}"`;
      return result;
    }
    listenerFuncsForName.delete(listenerName);
    domElement.removeEventListener(eventType, listenerFunc);
    result.success = true;
    return result;
  }
}
