import {addEvent} from './event';
import {wrapToVdom, isNotNeedRender} from '../utils';
import {REACT_FORWARD_COMPONENT, REACT_TEXT} from '../constants';

/**
 * 将虚拟DOM渲染到真实DOM节点里面
 * @param vdom
 * @param container
 */
function render(vdom, container) {
    if (isNotNeedRender(vdom)) return // 如果vdom不存在,则不需要创建真实dom;
    const dom = createDom(vdom);
    container.appendChild(dom);
}

/**
 * 将虚拟DOM转换成真实DOM
 * @param vdom
 */
function createDom(vdom) {
    if (isNotNeedRender(vdom)) return
    let dom;
    const {type, props, ref} = vdom;
    if (type && type.$$typeof === REACT_FORWARD_COMPONENT) {
        return mountForwardComponent(vdom);
    }
    if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
    }
    if (typeof type === 'string') {
        dom = document.createElement(type);
        renderAttributes(dom, props);
    }
    if (typeof type === 'function') {
        if (type.isReactComponent) { // 是一个类组件
            return mountClassComponent(vdom);
        }
        let renderVdom = wrapToVdom(type(props));
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
    if (ref) {
        ref.current = dom;
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
    const {type, props, ref} = vdom;
    const classInstance = new type(props);
    const classInstanceVdom = wrapToVdom(classInstance.render());
    classInstance.oldVdom =  classInstanceVdom; // 将虚拟dom挂载到当前组件实例上面.接下来的真实dom会挂到classInstanceVdom和classInstance.oldVdom上面;
    vdom.classInstance = classInstance;
    if (ref) {
        ref.current = classInstance;
    }
    return createDom(classInstanceVdom);
}

/**
 * 获取forwardRef包装过的组件的虚拟Dom
 * @param vdom
 * @returns {Text|*|Text|HTMLElement|HTMLElement}
 */
function mountForwardComponent(vdom) {
    const {type, props, ref} = vdom;
    const renderVdom = type.render(props, ref);
    vdom.oldVdom = renderVdom;
    return createDom(renderVdom);
}

/**
 * 为dom节点创建attributes属性
 * @param dom
 * @param attributes
 */
function renderAttributes(dom, attributes = {}, oldAttributes = {}) {
    const newAttsrKeys = Object.keys(attributes);
    const oldAttrsKeys = Object.keys(oldAttributes);
    const deleteAttrsKeys = oldAttrsKeys.filter(item => !newAttsrKeys.includes(item));
    deleteAttrsKeys.forEach(item => dom.removeAttribute(item)); // 删除旧节点,新节点没有了的属性

    for (let key in attributes) {
        const value = attributes[key];
        if (key === 'children') continue; // 属性无值不处理,children也单独处理
        if (key === 'style') {
            if (oldAttributes.style) {
                const newStyleKeys = Object.keys(value);
                const oldStyleKeys = Object.keys(oldAttributes.style);
                const deleStyleKeys = oldStyleKeys.filter(item => !newStyleKeys.includes(item));
                deleStyleKeys.forEach(item => dom.style[item] = ''); // 删除新节点不存在的样式
            }
            for (let attr in value) {
                const oldStyle = oldAttributes.style || {};
                if (value[attr] !== oldStyle[attr]) {
                    dom.style[attr] = value[attr];
                }
            }
        } else if (key.startsWith('on')) {
            addEvent(dom, key.toLocaleLowerCase(), value)
        } else if (value !== oldAttrsKeys[key]) { // 如果值更新了才进行更新
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
function findDom(vdom) {
    if (!vdom || typeof vdom !== 'object') return;
    const {type} = vdom;
    let dom;
    /**
     * 比如render(){return <Demo />}这里面render出来的还不是最终的虚拟dom;
     */
    if (typeof type === 'function') {
        if(vdom.classInstance){
            dom = findDom(vdom.classInstance.oldVdom);
        }else{
            // vdom可能是一个函数或者类组件,需要继续递归查找真实的DOM节点.
            dom = findDom(vdom.oldVdom);
        }
    } else {
        dom = vdom.dom;
    }
    return dom;
}

/**
 * 比较两次虚拟DOM的差异,并将差异更新到真实DOM节点上面去
 * @param oldVdom
 * @param newVdom
 */

export function compareTwoVdoms(oldVdom, newVdom, parentDom, nextDom) {
    if (!oldVdom && !newVdom) return;
    if (oldVdom && newVdom && (oldVdom.type !== newVdom.type)) { // 如果节点类型变了,直接进行全量更新
        const oldDom = findDom(oldVdom);
        const newDom = createDom(newVdom);
        oldDom.parentNode.replaceChild(newDom, oldDom);
    } else if (oldVdom && !newVdom) {
        const oldDom = findDom(oldVdom);
        oldDom.parentNode.removeChild(oldDom);
    } else if (!oldVdom && newVdom) {
        const newDom = createDom(newVdom);
        if (nextDom) { // 如果后面有节点,则应该进行插入操作
            parentDom.insertBefore(newDom, nextDom);
        } else {
            parentDom.appendChild(newDom);
        }
    } else {
        updateElement(oldVdom, newVdom);
    }
}

function updateElement(oldVdom, newVdom) {
    if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT ) {
        const dom = newVdom.dom = findDom(oldVdom);
        if(oldVdom.props.content !== newVdom.props.content){ // 当文本内容有变化才进行更新
            dom.textContent = newVdom.props.content;
        }
    }
    if (typeof oldVdom.type === 'string') { // 原生的HTML元素
        const currentDom = newVdom.dom = findDom(oldVdom); // 把老的Dom节点直接复制过来
        renderAttributes(currentDom, newVdom.props, oldVdom.props); // 更新节点属性
        updateChildren(currentDom, oldVdom.props.children, newVdom.props.children);
    } else if(typeof oldVdom.type === 'function'){
        if (oldVdom.type.isReactComponent) {
            updateClassComponent(oldVdom, newVdom)
        }else{
            updateFunctionComponent(oldVdom, newVdom);
        }
    }
}

function updateClassComponent(oldVdom, newVdom) {
    const classInstance = newVdom.classInstance = oldVdom.classInstance;
    classInstance.updater.emitUpdate(newVdom.props);
}

function updateFunctionComponent(oldVdom, newVdom){
    const {type, props} = newVdom;
    const newRenderVdom = type(props);
    compareTwoVdoms(oldVdom.oldVdom, newRenderVdom);
    newVdom.oldVdom = newRenderVdom;
}

/**
 * 循环对比子节点
 * @param parentDom
 * @param oldChildren
 * @param newChildren
 */
function updateChildren(parentDom, oldChildren, newChildren) {
    oldChildren = Array.isArray(oldChildren) ? oldChildren : [oldChildren];
    newChildren = Array.isArray(newChildren) ? newChildren : [newChildren];
    const maxLength = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLength; i++) {
        const nextDom = oldChildren.find((item, index) => index > i && item && findDom(item));
        compareTwoVdoms(oldChildren[i], newChildren[i], parentDom, findDom(nextDom));
    }
}

const ReactDOM = {
    render,
}

export default ReactDOM;
