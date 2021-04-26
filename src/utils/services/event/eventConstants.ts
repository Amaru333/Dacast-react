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
const EventDefinitions = [
    defineEvent('EVENT_VOD_UPLOADED', {} as unknown),
    defineEvent('EVENT_FORCE_LOGOUT', {} as unknown),
    defineEvent('EVENT_FORCE_TOKEN_REFRESH', {} as unknown),
    defineEvent('EVENT_RENDITIONS_ENCODED', {} as unknown),
    defineEvent('EVENT_COMPANY_PAGE_EDITED', {} as unknown),
    defineEvent('EVENT_LOG_IN_SUCCESS', {} as unknown),
    defineEvent('ADDITIONAL_SEATS_PURCHASED', {} as unknown)
]
export const Events = EventDefinitions.map(event => event[0])
export type EventArgs = Reduce<MapToObj<(typeof EventDefinitions)[0]>>

export type EventType = (typeof EventDefinitions)[0][0]
