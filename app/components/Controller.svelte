<script lang="ts">
  import { Screen } from '@nativescript/core/platform';
  import orientation from 'nativescript-orientation';

  import ActionBar from './ActionBar.svelte';

  import Button from './LayoutComponents/Button.svelte';

  let absLayout;

  const availableComponents = {
    button: Button
  }

  function handleNavigatedTo() {
    orientation.setOrientation('landscape');
    setTimeout(() => {
      console.log("height", absLayout.current);
    }, 1000);
  }

  function handleNavigatingFrom() {
    orientation.enableRotation();
  }

  function getLeftPosition(component: LayoutComponent): number {
    if(component.position.right != null) {
      return Screen.mainScreen.heightDIPs - component.position.right;  
    }
    return component.position.left;
  } 

  function getTopPosition(component: LayoutComponent): number {
    if(component.position.bottom != null) {
      return Screen.mainScreen.widthDIPs - component.position.bottom;  
    }
    return component.position.top;
  } 

  export let layout: Layout;

</script>

<page on:navigatedTo={handleNavigatedTo} on:navigatingFrom={handleNavigatingFrom} actionBarHidden="true">
  <ActionBar/>
  <absoluteLayout bind:this={absLayout} backgroundColor="red">
    {#each layout.components as component}
      {#if component.type === "button"}
        <svelte:component 
          this={availableComponents[component.type]} 
          left={getLeftPosition(component)}
          top={getTopPosition(component)}
          {component}
        />
      {/if}
    {/each}
  </absoluteLayout>
</page>