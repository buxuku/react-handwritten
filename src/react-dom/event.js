import { updateTracker } from '../react/Updater';

/**
 * 事件注册,所有的事件都绑定到Document上面
 * @param dom
 * @param key
 * @param handler
 */
export function addEvent(dom, eventType, handler){
    dom.store = dom.store || {};
    dom.store[eventType] = handler; // 给dom增加一个store属性来缓存当前dom上面绑定的所有事件.
    if(!document[eventType]){ // 同一类型的事件在document上面只需要绑定一次
        document[eventType] = dispatchEvent;
    }
}

/**
 * 事件派发
 * @param event
 */
function dispatchEvent(event){
    updateTracker.isBatchingUpdate = true;
    let { target, type } = event;
    let eventType = `on${type}`;
    let syntheticEvent = createSyntheticEvent(event);
    // 模拟事件冒泡,一直向父级元素进行冒泡
    while(target){
        let { store } = target;
        let handler = store && store[eventType];
        handler && handler.call(target, syntheticEvent);
        target=target.parentNode;
    }
    updateTracker.isBatchingUpdate = false;
    updateTracker.batchUpdate();
}

/**
 * 处理浏览器的一些兼容性处理
 * @param event
 * @returns {{}}
 */
function createSyntheticEvent(event){
    let syntheticEvent = {};
    for(let key in event){
        syntheticEvent[key] = event[key];
    }
    return syntheticEvent;
}
