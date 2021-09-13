<script lang="ts">
  export let component: ButtonLayoutCmp;

  export let left: number = undefined;
  export let top: number = undefined;

  console.log(left, top);

</script>

<button text={"teste"} height="64" {left} {top} />

<style>

</style>