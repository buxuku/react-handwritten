import { addEvent } from './event';
/**
 * 将虚拟DOM渲染到真实DOM节点里面
 * @param vdom
 * @param container
 */
function render(vdom, container) {
    if (vdom === null || vdom === undefined) return; // 如果vdom不存在,则不需要创建真实dom;
    const dom = createDom(vdom);
    container.appendChild(dom);
}

/**
 * 将虚拟DOM转换成真实DOM
 * @param vdom
 */
function createDom(vdom) {
    let dom;
    if (typeof vdom !== 'object') { // render可以直接渲染一个字符串或者数字,它不是一个React.element
        dom = document.createTextNode(vdom);
        return dom;
    }
    const {type, props} = vdom;
    if (typeof type === 'string') {
        dom = document.createElement(type);
        renderAttributes(dom, props);
    }
    if (typeof type === 'function') {
        if (type.isReactComponent) { // 是一个类组件
            return mountClassComponent(vdom);
        }
        // 让type执行,返回虚拟DOM,继续处理返回的虚拟DOM
        return createDom(type(props));
    }
    if (props) {
        const {children} = props;
        if (Array.isArray(children)) {
            reconcileChildren(children, dom);
        } else {
            render(children, dom);
        }
    }
    return dom;
}

/**
 * 依次渲染子元素
 * @param childrenVdom
 * @param parentDOM
 */
function reconcileChildren(childrenVdom, parentDOM) {
    for (let i = 0; i < childrenVdom.length; i++) {
        let childVdom = childrenVdom[i];
        render(childVdom, parentDOM);
    }
}

/**
 * 获取类组件的虚拟DOM
 * @param vdom
 * @returns {Text|*|HTMLElement}
 */
function mountClassComponent(vdom) {
    const {type, props} = vdom;
    const classInstance = new type(props);
    const classInstanceVdom = classInstance.render();
    return createDom(classInstanceVdom);
}

/**
 * 为dom节点创建attributes属性
 * @param dom
 * @param attributes
 */
function renderAttributes(dom, attributes = {}){
    for(let key in attributes){
        const value = attributes[key];
        if(!value || key === 'children') continue; // 属性无值不处理,children也单独处理
        if(key === 'style'){
            for(let attr in value){
                dom.style[attr] = value[attr];
            }
        } else if(key.startsWith('on')){
            addEvent(dom, key.toLocaleLowerCase(), value)
        } else {
            dom[key] = value;
        }
    }
    return dom;
}

const ReactDOM = {
    render,
}

export default ReactDOM;
