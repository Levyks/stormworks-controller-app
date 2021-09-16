<script lang="ts">
  import { GestureTypes } from "@nativescript/core/ui/gestures";
  import { TouchGestureEventData, isAndroid, Label } from "@nativescript/core";

  import { onMount } from 'svelte';

  export let output;
  export let component: ButtonLayoutCmp;

  export let left: number = undefined;
  export let top: number = undefined;

  let button;
  let pressed: boolean;

  onMount(() => {
    button._nativeElement.on(GestureTypes.touch, (args: TouchGestureEventData) => {
      if(args.action === "down") pressed = true;
      else if(args.action === "up") pressed = false;
      output.boolean[component.channel] = pressed;
    });

    if(isAndroid) {
      button._nativeElement.android.setGravity(17);
    }
  });   

</script>

<label 
  text={component.label} 
  height={component.height} 
  width={component.width} 
  borderRadius={(component.height + component.width)/4}
  class:pressed={pressed}
  bind:this={button}
  {left} {top} 
/>

<style>
  label {
    background-color: red;
    color: white;
    font-size: 30;
    text-align: center;
  }

  .pressed {
    background-color: darkred;
  }
</style>