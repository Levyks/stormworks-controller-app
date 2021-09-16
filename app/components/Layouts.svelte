<script lang="ts">
  import { SocketIO } from '@triniwiz/nativescript-socketio';
  import { navigate } from 'svelte-native';
  
  import { onMount } from 'svelte';

  import ActionBar from './ActionBar.svelte';
  import Controller from './Controller.svelte';

  import DefaultLayouts from '../layouts/defaults';

  export let socket: SocketIO;

  onMount(() => {
  });

  type Layout = {
    id: string,
    name: string
  }

  let layouts = DefaultLayouts;

  function handleLayoutTap(e) {
    const layout: Layout = layouts[e.object.value];
    navigate({
      page: Controller,
      props: {layout, socket}
    });
  }
</script>

<page>
  <ActionBar/>
  <flexboxLayout class="page">
    <stackLayout>
      <label class="h1 m-t-15" text="Choose an layout"/>
      {#each layouts as layout, idx}
        <button on:tap={handleLayoutTap} value={idx} text={layout.name}/>
      {/each}
    </stackLayout>
    <button class="new-layout-btn" text="+ Create a new one"/>
  </flexboxLayout>
</page>

<style>
  .h1 {
    text-align: center;
    padding-bottom: 25;
  }

  button {
    background-color: #4287f5;
    font-size: 24;
    height: 64;
    color: white;
  }

  .new-layout-btn {
    margin-bottom: 20
  }

  .page {
    flex-direction: column;
    justify-content: space-between;
  }

</style>
