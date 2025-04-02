import { defineCustomElement } from 'vue'

import CustomMarker from '@/views/common/custom-marker.ce.vue'

const CustomMarkerCtx = defineCustomElement(CustomMarker)
export const registerCustomElement = () => {
  customElements.define('custom-marker', CustomMarkerCtx)
}

export {
  CustomMarker,
  CustomMarkerCtx
}
