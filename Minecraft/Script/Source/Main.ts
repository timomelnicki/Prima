namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");
  
  export let viewport: ƒ.Viewport;
  export let blocks: ƒ.Node
  export let grid: Block[][][] = [];
  let steve: ƒ.Node;
  let rigidbodySteve: ƒ.ComponentRigidbody;
  let isGrounded: boolean = false;

  enum MINECRAFT {
    STEVE_COLLIDES = "steveColliedes"
  }

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);



  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
    
    setUpSteve();

    generateWorld(9, 3, 9);

    let pickAlgorithm = [pickByComponent, pickByCamera, pickByRadius, pickByGrid];
    

    viewport.canvas.addEventListener("pointerdown", pickAlgorithm[1]);
    viewport.getBranch().addEventListener("pointerdown", <ƒ.EventListenerUnified>hitComponent);
    viewport.getBranch().addEventListener(MINECRAFT.STEVE_COLLIDES, (_event: Event) => console.log(_event))

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();

    steveControlles();

  }

  function setUpSteve(){

    let camera: ƒ.ComponentCamera = viewport.getBranch().getChildrenByName("steve")[0].getComponent(ƒ.ComponentCamera);
    viewport.camera = camera;
    steve = viewport.getBranch().getChildrenByName("steve")[0];
    rigidbodySteve = steve.getComponent(ƒ.ComponentRigidbody);
    rigidbodySteve.effectRotation = ƒ.Vector3.Y();
    ƒ.Physics.settings.sleepingAngularVelocityThreshold = 0.1;
    rigidbodySteve.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, steveColliedes);

  }
  
  function steveControlles(){

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
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.ARROW_UP]) && isGrounded) {
      rigidbodySteve.addVelocity(ƒ.Vector3.Y(5));
      isGrounded = false;
    }

  }

  function steveColliedes(_event: ƒ.EventPhysics): void{

    // let colissionVector: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(_event.collisionPoint, steve.mtxWorld.translation);
    isGrounded = true;
    let customEvent: CustomEvent = new CustomEvent(MINECRAFT.STEVE_COLLIDES, {bubbles: true, detail: steve.mtxWorld.translation});
    steve.dispatchEvent(customEvent);
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
          let vctPostion: ƒ.Vector3 = new ƒ.Vector3(x - vctOffset.x, y+ Math.random()*0.1, z - vctOffset.y);
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

}

