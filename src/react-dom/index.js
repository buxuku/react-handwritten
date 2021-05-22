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
        let renderVdom = type(props);
        vdom.oldVdom = renderVdom;
        // 让type执行,返回虚拟DOM,继续处理返回的虚拟DOM
        return createDom(renderVdom);
    }
    if (props) {
        const {children} = props;
        if (Array.isArray(children)) {
            reconcileChildren(children, dom);
        } else {
            render(children, dom);
        }
    }
    vdom.dom = dom;
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
    classInstance.oldVdom = classInstanceVdom; // 将虚拟dom挂载到当前组件实例上面.接下来的真实dom会挂到classInstanceVdom和classInstance.oldVdom上面;
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

/**
 * 递归查找真实dom节点
 * @param vdom
 * @returns {*}
 */
function findDom(vdom){
    const { type } = vdom;
    let dom;
    /**
     * 比如render(){return <Demo />}这里面render出来的还不是最终的虚拟dom;
     */
    if(typeof type === 'function'){
        // vdom可能是一个函数或者类组件,需要继续递归查找真实的DOM节点.
        dom = findDom(vdom.oldVdom);
    }else{
        dom = vdom.dom;
    }
    return dom;
}

/**
 * 比较两次虚拟DOM的差异,并将差异更新到真实DOM节点上面去
 * @param oldVdom
 * @param newVdom
 */

export function compareTwoVdoms(oldVdom, newVdom){
    let oldDom = findDom(oldVdom);
    let newDom = createDom(newVdom);
    oldDom.parentNode.replaceChild(newDom, oldDom);
}

const ReactDOM = {
    render,
}

export default ReactDOM;
