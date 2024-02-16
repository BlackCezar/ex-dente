import mitt from 'mitt'

export type ApplicationEvents = {
    'call:callBackForm': {
        doctor: string
    } | void
    'close:callBackForm': void
    'scroll:callBack': void
    'call:searchOpen': void
    'call:changeHeaderColor': string
}

export default defineNuxtPlugin(() => {
    // Then we just inform mitt about our event types
    const emitter = mitt<ApplicationEvents>()

    return {
        provide: {
            event: emitter.emit, // Will emit an event
            listen: emitter.on, // Will register a listener for an event
        },
    }
})
