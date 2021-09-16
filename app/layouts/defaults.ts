const layouts: Layout[] = [
  {
    id: "def-1",
    name: "1 Thumbstick, 2 Pedals",
    components: [
      {
        type: "button",
        position: {
          bottom: 15,
          right: 150
        },
        height: 64,
        width: 64,
        label: "A",
        channel: 1
      } as ButtonLayoutCmp,
      {
        type: "thumbstick",
        position: {
          bottom: 10,
          left: 10
        },
        height: 192,
        width: 192,

        channelX: 2,
        channelY: 3
      } as ThumbstickLayoutCmp,
      {
        type: "slider",
        position:  {
          bottom: 10,
          right: 10
        },
        height: 240,
        width: 96,

        channel: 1,

        min: -1,
        max: 1,
        default: 0,
        sticky: false

      } as SliderLayoutCmp
    ]
  }
]


export default layouts;