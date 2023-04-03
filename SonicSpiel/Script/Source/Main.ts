namespace Script {
  import ƒ = FudgeCore;
  //import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let graph: ƒ.Node;
  let knuckles: ƒ.Node; 
  let gravity: number = -9.81;
  let ySpeed: number = 0;
  let isGrounded: boolean = true;
  //let isGrounded: boolean = true;
  //let gravity: number = 0.3;
  //let ySpeed: number = 1;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    graph = viewport.getBranch();
    knuckles = graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0];
    knuckles.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4));
    let cmpCamera: ƒ.ComponentCamera = viewport.getBranch().getComponent(ƒ.ComponentCamera);
    viewport.camera = cmpCamera;
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(); //(ƒ.LOOP_MODE.TIME_GAME, 30);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    //ySpeed += gravity;
    viewport.draw();
    ƒ.AudioManager.default.update();
    let timeFrame: number = ƒ.Loop.timeFrameGame / 1000; // time since last frame in seconds
    //let graph: ƒ.Node = viewport.getBranch();
    //let knuckles: ƒ.Node = graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0];
    //console.log(graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0]);
    //knuckles.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4));
    //knuckles.mtxLocal.translateX(1);+
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
      knuckles.mtxLocal.translateX(2 * timeFrame);

    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]))
      knuckles.mtxLocal.translateX(-2 * timeFrame);

    //if (pos.y > -0.5)
      //knuckles.mtxLocal.translateY(-0.2);
    //else
      //knuckles.mtxLocal.translateY(+1);
      //if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.ARROW_UP]))
        //knuckles.mtxLocal.translateY(+1);
        //isGrounded = false;
      //if (pos.y > 0)
        //knuckles.mtxLocal.translateY(-0.3);
      if (isGrounded && ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
        ySpeed = 5;
        isGrounded = false;
  }
  ySpeed += gravity * timeFrame;
    let pos: ƒ.Vector3 = knuckles.mtxLocal.translation;
    pos.y += ySpeed * timeFrame;
    if (pos.y < 0) {
      ySpeed = 0;
      pos.y = 0;
      isGrounded = true;
    }
    knuckles.mtxLocal.translation = pos;
    viewport.draw();
  }
}

//mtxLocal.translation.y = 0 matrix translation an Y
//mtxLocal.translation = V neuer Vektor