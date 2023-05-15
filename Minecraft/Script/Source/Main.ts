namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");
  
  export let viewport: ƒ.Viewport;
  export let blocks: ƒ.Node
  export let grid: Block[][][] = [];
  // let steve: ƒ.Node;
  let rigidbodySteve: ƒ.ComponentRigidbody;
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);



  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
    let camera: ƒ.ComponentCamera = viewport.getBranch().getChildrenByName("steve")[0].getComponent(ƒ.ComponentCamera);
    viewport.camera = camera;

    // steve = viewport.getBranch().getChildrenByName("steve")[0];
    // rigidbodySteve = steve.getComponent(ƒ.ComponentRigidbody);
    // rigidbodySteve.effectRotation = ƒ.Vector3.Y();
    // ƒ.Physics.settings.sleepingAngularVelocityThreshold = 0.1;
    // let cmpCamera: ƒ.ComponentCamera = steve.getComponent(ƒ.ComponentCamera);
    // viewport.camera = cmpCamera;

    generateWorld(9, 3, 9);

    let pickAlgorithm = [pickByComponent, pickByCamera, pickByRadius, pickByGrid];
    

    viewport.canvas.addEventListener("pointerdown", pickAlgorithm[1]);
    viewport.getBranch().addEventListener("pointerdown", <ƒ.EventListenerUnified>hitComponent);
    // let size: number = 9;

    // for (let x: number = 0; x < size; x++){
    //   for(let y: number = 0; y < size; y++){
    //     for(let z: number = 0; z < size; z++){
    //       let instance: Block = new Block(new ƒ.Vector3(x, y, z), ƒ.Color.CSS("green"));
    //       viewport.getBranch().addChild(instance);
    //       console.log(instance);
    //     }
    //   }
    // }

    //viewport.canvas.addEventListener("mousedown", pick);
    //viewport.getBranch().addEventListener("mousedown", <ƒ.EventListenerUnified>hit);
    // function pick(){
      
    //   let cameraMtxWorld: ƒ.Matrix4x4 = viewport.camera.mtxWorld;
    //   let hitScann: ƒ.Ray = new ƒ.Ray();
    //   hitScann.transform(cameraMtxWorld);
    //   hitScann.getDistance(new ƒ.Vector3);
    //   console.log(hitScann.getDistance(new ƒ.Vector3));
    // }

  

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();


    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
      rigidbodySteve.applyForce(ƒ.Vector3.SCALE(rigidbodySteve.node.mtxWorld.getZ(), 2600 ));
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
      rigidbodySteve.applyForce(ƒ.Vector3.SCALE(rigidbodySteve.node.mtxWorld.getZ(), -2600));
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      rigidbodySteve.applyTorque(ƒ.Vector3.Y(12));
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      rigidbodySteve.applyTorque(ƒ.Vector3.Y(-12));
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.ARROW_UP]) && rigidbodySteve.getVelocity().y == 0) {
      rigidbodySteve.addVelocity(ƒ.Vector3.Y(5));
    }
  }

  function generateWorld(_width: number, _height: number, _depth: number): void {
    blocks = new ƒ.Node("Blocks");
    viewport.getBranch().addChild(blocks);
    // let vctOffset: ƒ.Vector2 = new ƒ.Vector2(Math.floor(_width / 2), Math.floor(_depth / 2));
    let vctOffset: ƒ.Vector2 = ƒ.Vector2.ZERO();

    for (let y: number = 0; y < _height; y++) {
      grid[y] = [];
      for (let z: number = 0; z < _depth; z++) {
        grid[y][z] = [];
        for (let x: number = 0; x < _width; x++) {
          let vctPostion: ƒ.Vector3 = new ƒ.Vector3(x - vctOffset.x, y, z - vctOffset.y);
          let txtColor: string = ƒ.Random.default.getElement(["red", "lime", "blue", "yellow"]);
          let block: Block = new Block(vctPostion, ƒ.Color.CSS(txtColor));
          block.name = vctPostion.toString() + "|" + txtColor;
          blocks.addChild(block);
          grid[y][z][x] = block;
        }
      }
    }
    console.log(grid);
  }

  // function pick(_event: MouseEvent): void {
  //   console.log("pick")
  //   viewport.dispatchPointerEvent(<PointerEvent>_event);
  // }

  // function hit(_event: PointerEvent): void {
  //   let node: ƒ.Node = (<ƒ.Node>_event.target);
  //   let cmpPick: ƒ.ComponentPick = node.getComponent(ƒ.ComponentPick);

  //   console.log(cmpPick);
  // }
  // function generateWorld(){
  //   let instance: Block = new Block(ƒ.Vector3.X(0), ƒ.Color.CSS("red"))
  //   viewport.getBranch().addChild(instance);

  // function generate(i: number, pos: ƒ.Vector3): ƒ.Node {
  //   throw new Error("Function not implemented.");
  // }
}

