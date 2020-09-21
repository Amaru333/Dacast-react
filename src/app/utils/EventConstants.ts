export type MapToObj<U> = U extends any[] ? { name: U[0], value: U[1] } : never
export type Reduce<UniontoReduce extends { name: string, value: any }> = {
    [name in UniontoReduce['name']]: UniontoReduce extends { name: name, value: infer T } ? T : never
}
export type EventDef<Name, Type> = [Name, Type]

function defineEvent<Name extends string, Type>(name: Name, _: Type): EventDef<Name, Type> {
    //the actual value is ignored, we just want the type
    return [name, undefined]
}
/**
 * to define an event:
 * defineEvent([event name], {} as [type of the `arg` passed to the handler of the event])
 *
 * it's setup to automatically extract the type and strongly type the event handlers and hooks
 */
const PlayerEventDefinitions = [
    defineEvent('EVENT_VOD_UPLOADED', {} as unknown),
    defineEvent('EVENT_ACTIVE_VIEWERS_CHANGE', {} as number),
]
export const PlayerEvents = PlayerEventDefinitions.map(event => event[0])
export type EventArgs = Reduce<MapToObj<(typeof PlayerEventDefinitions)[0]>>

export type EventType = (typeof PlayerEventDefinitions)[0][0]