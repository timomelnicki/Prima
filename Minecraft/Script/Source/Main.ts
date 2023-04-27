namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);



  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    let size: number = 3

    for (let x: number = 0; x < size; x++){
      for(let y: number = 0; y < size; y++){
        for(let z: number = 0; z < size; z++){
          let instance: Block = new Block(new ƒ.Vector3(x, y, z), ƒ.Color.CSS("red"));
          viewport.getBranch().addChild(instance);
          console.log(instance);
        }
      }
    }

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  // function generateWorld(){
  //   let instance: Block = new Block(ƒ.Vector3.X(0), ƒ.Color.CSS("red"))
  //   viewport.getBranch().addChild(instance);

  // function generate(i: number, pos: ƒ.Vector3): ƒ.Node {
  //   throw new Error("Function not implemented.");
  // }
}

