import {REACT_TEXT} from '../constants'

/**
 * 判断是否是一个文本节点
 * @param element
 * @returns {boolean}
 */
function isTextElement(element) {
    return typeof element === 'string' || typeof element === 'number';
}

/**
 * 如果是文本节点,包装成一个虚拟DOM对象,方便挂载真实DOM节点
 * @param element
 * @returns {{type, props: {content}}|*}
 */
export function wrapToVdom(element) {
    return isTextElement(element) ? {
        type: REACT_TEXT, props: {content: element}
    } : element
}

/**
 * 判断一个虚拟节点是否不需要渲染成真实Dom
 * @param element
 * @returns {boolean}
 */
export function isNotNeedRender(vdom){
    return vdom === null || vdom === undefined || typeof vdom === 'boolean';
}

/**
 * 获取vdom的key属性
 * @param vdom
 * @param index
 * @returns {*|string}
 */
export function getVomKey(vdom, index){
    return vdom && vdom.key !== undefined ? vdom.key : `$$REACT_KEY_${index}`; // 添加前缀防止index和key冲突
}

/**
 * 对于[].map类型的节点,进行扁平化处理
 * @param children
 * @returns {*[]}
 */
export function flatten(children){
    const result = [];
    (function loop(array){
        array.forEach(child => {
            if(Array.isArray(child)){
                loop(child);
            }else{
                result.push(child);
            }
        })
    })(children)
    return result;
}

/**
 * 浅比较对比两个对象
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function shallowEqual(obj1, obj2){
    if(obj1 === obj2) return true;
    if(typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null){
        return false;
    }
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if(obj1Keys.length !== obj2Keys.length){
        return false;
    }
    for(let key of obj1Keys){
        if(!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]){
            return false;
        }
    }
    return true;
}
