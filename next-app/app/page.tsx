import { Slider } from "@nextui-org/react";

export default function Home() {
  return (
    <main>
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Slider   
        size="md"
        step={1}
        color="foreground"
        label="Temperature"
        showSteps={true} 
        maxValue={2} 
        minValue={0} 
        defaultValue={0}
        // className="max-w-md" 
      />
      <Slider   
        size="md"
        step={0.1}
        color="foreground"
        label="Temperature"
        showSteps={true} 
        maxValue={1} 
        minValue={0} 
        defaultValue={0.4}
        className="max-w-md" 
      />
      <Slider   
        size="lg"
        step={0.1}
        color="foreground"
        label="Temperature"
        showSteps={true} 
        maxValue={1} 
        minValue={0} 
        defaultValue={0.6}
        className="max-w-md" 
      />
    </div> 

    </main>
  );
}
