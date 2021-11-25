export const UserAction = {
    targetCallbacks : [],
    /**
     * 
     * @param {*} callback 
     * @returns The index of the callback, that helps while unsubscribing(removing from the array).
     */
    subscribe : function(callback) {
        targetCallbacks.push(callback);
        return targetCallbacks.length-1;
    },
    notifyAll : function(inputEventCode) {
        this.targetCallbacks.forEach(callback => {
            callback(inputEventCode);
        });
    },
    /**
     * 
     * @param {*} index 
     * We can just remove the callback using the index from the list.
     */
    unsubscribe: function(index) {
        targetCallbacks.splice(index,1);
    }
}