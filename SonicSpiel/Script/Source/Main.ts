namespace Script {
  import ƒ = FudgeCore;
  //import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let graph: ƒ.Node;
  let knuckles: ƒ.Node; 
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    graph = viewport.getBranch();
    knuckles = graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0];
    knuckles.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4));
    let cmpCamera: ƒ.ComponentCamera = viewport.getBranch().getComponent(ƒ.ComponentCamera);
    viewport.camera = cmpCamera;
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 3);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
    //let graph: ƒ.Node = viewport.getBranch();
    //let knuckles: ƒ.Node = graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0];
    //console.log(graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0]);
    //knuckles.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4));
    //knuckles.mtxLocal.translateX(1);
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
      knuckles.mtxLocal.translateX(0.1);

    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]))
      knuckles.mtxLocal.translateX(-0.1);

    let pos: ƒ.Vector3 = knuckles.mtxLocal.translation;
    if (pos.y > -0.5)
      knuckles.mtxLocal.translateY(-0.2);
    else
      knuckles.mtxLocal.translateY(+0.2);
  }
}