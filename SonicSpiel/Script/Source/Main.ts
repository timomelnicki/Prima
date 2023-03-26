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
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 1);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
    //let graph: ƒ.Node = viewport.getBranch();
    //let knuckles: ƒ.Node = graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0];
    //console.log(graph.getChildrenByName("Charakter")[0].getChildrenByName("knuckles")[0]);
    //knuckles.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4));
    knuckles.mtxLocal.translateX(1);
  }



}