import mitt from 'mitt'
import type { ApplicationEvents } from '~/plugins/event-bus'

const emitter = mitt<ApplicationEvents>()
export const useEvent = emitter.emit
export const useListen = emitter.on
