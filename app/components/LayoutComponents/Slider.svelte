<script lang="ts">
  import { PanGestureEventData } from "@nativescript/core";
  import { onMount } from 'svelte';

  export let component: SliderLayoutCmp;
  export let left: number;
  export let top: number;
  export let output;

  const RAIL_WIDTH = 12;
  const LEVER_HEIGHT = 24;

  let labelElem;
  let prevDelta: number;

  let defaultTranslate: number;

  output.number[component.channel - 1] = component.default;

  $: defaultTranslate = (((component.default - component.min)/(component.max - component.min)) - 0.5 ) * (LEVER_HEIGHT - component.height);

  onMount(() => {
    labelElem._nativeElement.translateY = defaultTranslate;
  });

  function handlePan(args: PanGestureEventData) {
    if (args.state === 1) {
      prevDelta = 0;
    }
    else if (args.state === 2) {
      const newTranslate = labelElem._nativeElement.translateY + args.deltaY - prevDelta;

      labelElem._nativeElement.translateY = Math.max(Math.min(newTranslate, (component.height-LEVER_HEIGHT)/2 ), (LEVER_HEIGHT-component.height)/2);

      if(newTranslate > ((LEVER_HEIGHT-component.height)/2) && newTranslate < ((component.height-LEVER_HEIGHT)/2)) {
        prevDelta = args.deltaY;
      }

      const fractionValue = (labelElem._nativeElement.translateY/(LEVER_HEIGHT-component.height)) + 0.5;

      output.number[component.channel - 1] = (fractionValue*(component.max - component.min)) + component.min; 
    }
    else if (args.state === 3) {
      if(!component.sticky) {
        labelElem._nativeElement.translateY = defaultTranslate;
        output.number[component.channel - 1] = component.default;
      } 
    }
  }

</script>

<absoluteLayout 
  height={component.height} 
  width={component.width} 
  {left} {top}
>
  <label
    horizontalAlignment="center"
    left={(component.width - RAIL_WIDTH)/2}
    height={component.height} 
    width={RAIL_WIDTH}
    backgroundColor="#aaaaaa"
  />
  <label
    horizontalAlignment="center"
    top={(component.height - LEVER_HEIGHT)/2}
    height={LEVER_HEIGHT} 
    width={component.width}
    backgroundColor="red"
    bind:this={labelElem}
    on:pan={handlePan}
  />
</absoluteLayout>