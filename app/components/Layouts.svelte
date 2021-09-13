<script lang="ts">
  import { SocketIO } from '@triniwiz/nativescript-socketio';
  import ActionBar from './ActionBar.svelte';

  export let socket: SocketIO;
</script>

<page>
  <ActionBar/>
  <stackLayout>
    <label class="h1" text="Choose an layout"/>
  </stackLayout>
</page>

<style>
  .h1 {
    text-align: center;
    padding-bottom: 25;
  }

  button {
    background-color: #1EAEDB;
    font-size: 16;
    color: white;
  }

  .form-label {
    vertical-align: center;
    font-weight: bold;
    font-size: 14;
    color: black;
  }

  textField {
    font-size: 16;
  }

  .page {
    flex-direction: column;
    justify-content: center;
  }
</style>
