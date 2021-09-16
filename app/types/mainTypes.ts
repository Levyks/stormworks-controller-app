interface Layout {
  id: string,
  name: string,
  components: LayoutComponent[]
}

interface LayoutComponent {
  type: "button" | "slider" | "thumbstick",
  position: {
    left?: number,
    top?: number,
    right?: number,
    bottom?: number
  },
  height: number,
  width: number
}

interface ButtonLayoutCmp extends LayoutComponent {
  label: string,
  channel: number,
}

interface ThumbstickLayoutCmp extends LayoutComponent {
  channelX: number,
  channelY: number
}

interface SliderLayoutCmp extends LayoutComponent {
  channel: number,
  min: number,
  max: number,
  default: number,
  sticky: boolean
}
