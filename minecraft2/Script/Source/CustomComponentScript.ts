namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class CustomComponentScript extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(CustomComponentScript);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "Creeper Creeper oooooooooooh YEAH!";

    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Debug.log(this.message, this.node);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
        case ƒ.EVENT.RENDER_PREPARE:
          console.log("rendering Node");
          break;
      }
    }
    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
      
    //   // undefined properties and private fields (#) will not be included by default
    // }
    }
    export function moveCreeper(){
      NPC= viewport.getBranch().getChildrenByName("NPC")[0];
      creeperrigidbody = NPC.getComponent(ƒ.ComponentRigidbody);
      let positionSteve: ƒ.Vector3 = steve.mtxWorld.translation;
      let positionCreeper: ƒ.Vector3 = NPC.mtxWorld.translation;

      let movementVector= ƒ.Vector3.DIFFERENCE(positionSteve, positionCreeper);
      movementVector.normalize(100);
      creeperrigidbody.applyForce(movementVector);
    }
  }