"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Block extends ƒ.Node {
        constructor(_position, _color) {
            super("Block");
            this.addComponent(new ƒ.ComponentMesh(Block.mshcube));
            let cmpMaterial = new ƒ.ComponentMaterial(Block.mtrcube);
            cmpMaterial.clrPrimary = _color;
            this.addComponent(new ƒ.ComponentMaterial(Block.mtrcube));
            // this.addComponent(new ƒ.ComponentTransform());
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
            this.addComponent(cmpTransform);
        }
    }
    Block.mshcube = new ƒ.MeshCube("Block");
    Block.mtrcube = new ƒ.Material("Block", ƒ.ShaderFlat, new ƒ.CoatRemissive);
    Script.Block = Block;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        constructor() {
            super();
            // Properties may be mutated by users in the editor via the automatically created user interface
            this.message = "CustomComponentScript added to ";
            // Activate the functions of this component as response to events
            this.hndEvent = (_event) => {
                switch (_event.type) {
                    case "componentAdd" /* COMPONENT_ADD */:
                        ƒ.Debug.log(this.message, this.node);
                        break;
                    case "componentRemove" /* COMPONENT_REMOVE */:
                        this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                        this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                        break;
                    case "nodeDeserialized" /* NODE_DESERIALIZED */:
                        // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                        break;
                }
            };
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
    }
    // Register the script as component for use in the editor via drag&drop
    CustomComponentScript.iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        let size = 3;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                for (let z = 0; z < size; z++) {
                    let instance = new Script.Block(new ƒ.Vector3(x, y, z), ƒ.Color.CSS("red"));
                    viewport.getBranch().addChild(instance);
                    console.log(instance);
                }
            }
        }
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
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
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map