namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let cubeBlue: ƒ.Graph;
  let world: ƒ.Graph;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    generateWorld();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function generateWorld(){
    let displacement: number = 1.01;
    let index: number = 0;
    let size: number = 5;
    let cubes: ƒ.Node[] = new Array (size * size * size);

    let transform: ƒ.Node = new ƒ.Node("transform");
    transform.addComponent(new ƒ.ComponentTransform());
    transform.mtxLocal.translation = pos;

    for (let x: number = 0; x < size; x++){
      for(let y: number = 0; y < size; y++){
        for(let z: number = 0; z < size; z++){
          cubes[index] = generate(index, new ƒ.Vector3(x*displacement, y*displacement, z*displacement));
          index++;
        }
      }
    }
  }
}

function generate(i: number, pos: ƒ.Vector3): ƒ.Node {
  throw new Error("Function not implemented.");
}
