<script lang="ts">
  import * as appSettings from '@nativescript/core/application-settings';
  import { alert } from '@nativescript/core/ui/dialogs';
  import { SocketIO } from '@triniwiz/nativescript-socketio';
  import { navigate } from 'svelte-native';

  import ActionBar from './ActionBar.svelte';
  import Layouts from './Layouts.svelte';

  let ip: string = appSettings.getString('lastIp');
  let port: string = appSettings.getString('lastPort') || "8000";
  let isLoading = false;
  let socket: SocketIO;

  function connect() {  
    if(!ip || !port) return alert({
      title: "Connecting to PC",
      message: "Please fill in the IP Address and Port",
      okButtonText: "OK"
    });

    appSettings.setString("lastIp", ip);
    appSettings.setString("lastPort", port);

    isLoading = true;

    if(socket) socket.disconnect();
    socket = new SocketIO(`http://${ip}:${port}`);
    socket.connect();
    socket.once("connect", () => {
      isLoading = false;
      navigate({
        page: Layouts,
        props: {socket: socket}
      })
    })
    socket.once("connect_error", () => {
      isLoading = false;
      alert({
        title: "Error",
        message: "Could not connect to server",
        okButtonText: "OK"
      });
    });
  }
</script>

<page>
  <ActionBar/>
  {#if !isLoading}
    <flexboxLayout class="page">
      <label class="h1" text="Connect to the PC"/>
      <stackLayout class="nt-form">
        <gridLayout class="nt-input" rows="auto" columns="*,*,*,*">
          <label text="IP Address" class="form-label" row="0" col="0" />
          <textField col="1" row="0" colSpan="3" bind:text={ip} required/>
        </gridLayout>
        <gridLayout class="nt-input" rows="auto" columns="*,*,*,*">
          <label text="Port" class="form-label" row="0" col="0" />
          <textField col="1" row="0" colSpan="3" bind:text={port} keyboardType="number" required/>
        </gridLayout>
        <button text="Connect" class="btn btn-primary" on:tap={connect}></button>
      </stackLayout>
    </flexboxLayout>
  {:else}
    <activityIndicator width="128" height="128" busy={true}/>
  {/if}
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
