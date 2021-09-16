<script lang="ts">
  import { PanGestureEventData } from "@nativescript/core";

  export let component: ThumbstickLayoutCmp;

  let radius;
  let diameter;

  $: {
    diameter = (component.height + component.width)/2;
    radius = diameter/2
  }

  export let left: number;
  export let top: number;
  export let output;

  const OUTER_SCALE = 1.5;
  const INNER_SCALE = 2;

  let outerDiameter: number;
  let outerRadius: number;
  let outerRadiusD2: number;

  let innerDiameter: number;
  let innerRadius: number;

  let prevDeltaX = 0;
  let prevDeltaY = 0;
  let labelElem;

  $: {
    outerDiameter = diameter/OUTER_SCALE;
    outerRadius = diameter/2;
    outerRadiusD2 = outerRadius/2;
    
    innerDiameter = outerDiameter/INNER_SCALE;
    innerRadius = innerDiameter/2;
  }

  function bound(x) {
    return Math.max(Math.min(x, outerRadiusD2), -(outerRadiusD2));
  }

  function handlePan(args: PanGestureEventData) {
    if (args.state === 1) {
      prevDeltaX = 0;
      prevDeltaY = 0;
    }
    else if (args.state === 2) {
      const newTranslateX = labelElem._nativeElement.translateX + args.deltaX - prevDeltaX;
      const newTranslateY = labelElem._nativeElement.translateY + args.deltaY - prevDeltaY;

      labelElem._nativeElement.translateX = bound(newTranslateX);
      labelElem._nativeElement.translateY = bound(newTranslateY);

      if(newTranslateX > -outerRadiusD2 && newTranslateX < outerRadiusD2) {
        prevDeltaX = args.deltaX;
      } else {
        prevDeltaX = labelElem._nativeElement.translateX;
      }

      if(newTranslateY > -outerRadiusD2 && newTranslateY < outerRadiusD2) {
        prevDeltaY = args.deltaY;
      } else {
        prevDeltaY = labelElem._nativeElement.translateY;
      }

      output.number[component.channelX - 1] = (labelElem._nativeElement.translateX*2)/outerRadius;
      output.number[component.channelY - 1] = (-labelElem._nativeElement.translateY*2)/outerRadius;
    }
    else if (args.state === 3) {
      labelElem._nativeElement.translateX = 0;
      labelElem._nativeElement.translateY = 0;
      output.number[component.channelX - 1] = 0;
      output.number[component.channelY - 1] = 0;
    }
  }

</script>

<absoluteLayout 
  height={diameter} 
  width={diameter} 
  {left} {top}
>
  <label
    horizontalAlignment="center"
    left={(diameter-outerDiameter)/2}
    top={(diameter-outerDiameter)/2}
    height={outerDiameter} 
    width={outerDiameter}
    borderRadius={outerRadius}
    backgroundColor="#eaeaea"
  />
  <label
    horizontalAlignment="center"
    left={(diameter-innerDiameter)/2}
    top={(diameter-innerDiameter)/2}
    height={innerDiameter} 
    width={innerDiameter}
    borderRadius={innerRadius}
    backgroundColor="#aaaaaa"

    bind:this={labelElem}
    on:pan={handlePan}
  />
</absoluteLayout>



  