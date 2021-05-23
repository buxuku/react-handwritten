/**
 * 更新标识,标识是否处于批量更新状态中
 * @type {{batchUpdate(): void, isBatchingUpdate: boolean, updaters: *[]}}
 */
export let updateTracker = {
    isBatchingUpdate: false,
    updaters: [],
    batchUpdate() {
        for (let updater of updateTracker.updaters) {
            updater.updateComponent();
        }
        updateTracker.isBatchingUpdate = false;
        updateTracker.updaters.length = 0;
    }
};

/**
 * 组件更新器,用来维护更新队列
 */
export class Updater {
    constructor(componentInstance) {
        this.componentInstance = componentInstance;
        this.pendingState = []; // 需要更新state的队列
        this.batchTracking = false; // 标识当前实例是否已经添加进了updateTracer队列中
    }

    addState(partialState) {
        this.pendingState.push(partialState);
        if (!updateTracker.isBatchingUpdate) { //如果不是批量更新,则直接更新组件
            this.updateComponent()
        } else if (!this.batchTracking) { // 如果还没有添加进updateTracker队列中,刚添加进去
            updateTracker.updaters.push(this);
            this.batchTracking = true;
        }
    }

    updateComponent() {
        const {componentInstance, pendingState} = this;
        if (pendingState.length) {
            componentInstance.state = this.getState();
            componentInstance.forceUpdate();
        }
        this.batchTracking = false;
    }

    getState() {
        let {componentInstance, pendingState} = this;
        let {state} = componentInstance; // 获取老的state
        pendingState.forEach(item => {
            if (typeof item === 'function') { // setState第一个参数有可能是传入的一个函数,入参是上一步最新的State
                item = item(state);
            }
            state = {...state, ...item};
        })
        pendingState.length = 0; // 清空队列
        return state;
    }
}
