namespace Script {
    import ƒ = FudgeCore;
  
    export class Block extends ƒ.Node {
      static mshCube: ƒ.MeshCube = new ƒ.MeshCube("Block");
      static mtrCube: ƒ.Material = new ƒ.Material("Block", ƒ.ShaderFlat, new ƒ.CoatRemissive());
  
      constructor(_position: ƒ.Vector3, _color: ƒ.Color) {
        super("Block");
        this.addComponent(new ƒ.ComponentMesh(Block.mshCube));
        
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Block.mtrCube)
        cmpMaterial.clrPrimary = _color;
        this.addComponent(cmpMaterial);
  
        this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
  
        let cmpPick: ƒ.ComponentPick = new ƒ.ComponentPick();
        cmpPick.pick = ƒ.PICK.CAMERA;
        this.addComponent(cmpPick);

        let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE);
        this.addComponent(cmpRigidbody);
      }
    }
  }

// namespace Script {
//     import ƒ = FudgeCore;

//     export class Block extends ƒ.Node{
//         static mshcube: ƒ.MeshCube = new ƒ.MeshCube("Block");
//         static mtrcube: ƒ.Material = new ƒ.Material("Block", ƒ.ShaderFlat, new ƒ.CoatRemissive);
//         constructor(_position: ƒ.Vector3, _color: ƒ.Color){
//             super("Block");
            
//             this.addComponent(new ƒ.ComponentMesh(Block.mshcube));

//             let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Block.mtrcube);
//             cmpMaterial.clrPrimary = _color;
//             this.addComponent(cmpMaterial);

//             // this.addComponent(new ƒ.ComponentTransform());
//             let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
//             this.addComponent(cmpTransform);

//             let cmpPick: ƒ.ComponentPick = new ƒ.ComponentPick;
//             cmpPick.pick = ƒ.PICK.RADIUS;
//             this.addComponent(cmpPick)
//         }
//     }
// }