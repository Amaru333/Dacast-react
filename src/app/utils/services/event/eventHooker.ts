import { PlayerEvents, EventType, EventArgs } from './eventConstants'

export type EventHookerHandler<ArgsType> = (args: ArgsType) => void
type HandlerType = 'persistant' | 'once'
type Subscriber<ArgsType> = {
    handler: EventHookerHandler<ArgsType>
    handlerType: HandlerType
}

class EventHooker {
    private subscribers: { [eventName in EventType]?: Subscriber<EventArgs[eventName]>[] } = {}

    dispatch = <T extends EventType>(eventName: T, args: EventArgs[T]) => {
        if (!(eventName in this.subscribers)) {
            return
        }
        let handlerObjList = this.subscribers[eventName]
        handlerObjList.forEach(obj => obj.handler(args))
        //remove all the handlers that were of type 'callOnce'
        this.subscribers[eventName] = handlerObjList.filter(obj => obj.handlerType !== 'once')
        if (this.subscribers[eventName].length === 0) {
            delete this.subscribers[eventName]
        }
    }

    private storeSubscriber = <T extends EventType>(eventName: T, handler: EventHookerHandler<EventArgs[T]>, handlerType: HandlerType) => {
        if (!(eventName in this.subscribers)) {
            this.subscribers[eventName] = []
        }
        this.subscribers[eventName].push({
            handler,
            handlerType
        })
    }

    subscribeForOneCall = <T extends EventType>(eventName: T, handler: EventHookerHandler<EventArgs[T]>) => {
        this.storeSubscriber(eventName, handler, 'once')
    }

    /**
     * subscribe function to event
     */
    subscribe = <T extends EventType>(eventName: T, handler: EventHookerHandler<EventArgs[T]>) => {
        this.storeSubscriber(eventName, handler, 'persistant')
    }

    /**
     * subscribe function to event
     */
    unsubscribe = <T extends EventType>(eventName: T, handler: EventHookerHandler<EventArgs[T]>) => {
        if (!(eventName in this.subscribers)) {
            return
        }
        this.subscribers[eventName] = this.subscribers[eventName].filter(o => o.handler !== handler)
        if (this.subscribers[eventName].length === 0) {
            delete this.subscribers[eventName]
        }
    }

    unsubscribeAll = () => {
        this.subscribers = {}
    }
}

export default new EventHooker