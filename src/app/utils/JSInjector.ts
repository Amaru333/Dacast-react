class CallbackQueue{

    constructor(){
        this.queue = [];
        this.triggered = false;
        
        this.add = this.add.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    add(callback){
        if(this.triggered){
            callback();
            return;
        }
        this.queue.push(callback);
    }

    trigger(){
        this.triggered = true;

        for(let callback of this.queue){
            callback();
        }
    }
}


class JSInjector {

    constructor(){
        this.loadedScripts = {
            //[src]: new CallbackQueue()
        };

        this.injectJs = this.injectJs.bind(this);
    }

    /**
     * 
     * @param {string} source source file
     * @returns {Promise<void>} promise triggered when the script is injected
     */
    async injectJs(source){
        return new Promise((resolve, reject) => {

            let previouslyLoaded = this.loadedScripts[source];
            if(previouslyLoaded){
                previouslyLoaded.add(resolve);
                return;
            }
            
            let queue = new CallbackQueue();
            queue.add(resolve);
            this.loadedScripts[source] = queue;
            
            let script = document.createElement('script');
            let head = document.head || document.getElementsByTagName('head')[0];
            script.src = source;
            script.addEventListener('load', queue.trigger);
            script.async = true;
            head.insertBefore(script, head.firstChild);
        })
    }

}

export default new JSInjector;