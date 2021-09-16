<script lang="ts">
  import * as util from '@nativescript/core/utils';
  import orientation from 'nativescript-orientation';
  import { SocketIO } from '@triniwiz/nativescript-socketio';
  
  import ActionBar from './ActionBar.svelte';

  import Button from './LayoutComponents/Button.svelte';
  import Thumbstick from './LayoutComponents/Thumbstick.svelte';  
  import Slider from './LayoutComponents/Slider.svelte';

  export let layout: Layout;
  export let socket: SocketIO;

  let absLayout;
  let absHeight: number;
  let absWidth: number;
  let loaded: boolean;

  let output = {
    number: new Array(32).fill(0),
    boolean: new Array(32).fill(false),
  }

  const interval = setInterval(() => {
    socket.emit('controllerData', output);
  }, 1000/30);

  const availableComponents = {
    button: Button,
    thumbstick: Thumbstick,
    slider: Slider
  }
  
  function handleNavigatingTo() {
    orientation.setOrientation('landscape');    
  }

  function handleNavigatedTo() {
    absHeight = util.layout.toDeviceIndependentPixels(absLayout._nativeElement.getMeasuredHeight());
    absWidth = util.layout.toDeviceIndependentPixels(absLayout._nativeElement.getMeasuredWidth());
    loaded = true;
  }

  function handleNavigatingFrom() {
    orientation.enableRotation();
    clearInterval(interval);
  }

  function getLeftPosition(component: LayoutComponent): number {
    if(component.position.right != null) {
      return absWidth - component.position.right - component.width;  
    }
    return component.position.left;
  } 

  function getTopPosition(component: LayoutComponent): number {
    if(component.position.bottom != null) {
      return absHeight - component.position.bottom - component.height;  
    }
    return component.position.top;
  } 

</script>

<page 
  on:navigatingTo={handleNavigatingTo} 
  on:navigatedTo={handleNavigatedTo} 
  on:navigatingFrom={handleNavigatingFrom} 
>
  <ActionBar/>
  <absoluteLayout bind:this={absLayout}>
    {#if loaded}
      {#each layout.components as component}
        <svelte:component 
          this={availableComponents[component.type]} 
          left={getLeftPosition(component)}
          top={getTopPosition(component)}
          bind:output={output}
          {component}
        />
      {/each}
    {/if}
  </absoluteLayout>
</page>

<style>
  absoluteLayout {
    background-color: black;
  }
</style>