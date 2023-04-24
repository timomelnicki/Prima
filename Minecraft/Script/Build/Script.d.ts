declare namespace Script {
    import ƒ = FudgeCore;
    class Block extends ƒ.Node {
        static mshcube: ƒ.MeshCube;
        static mtrcube: ƒ.Material;
        constructor(_position: ƒ.Vector3, _color: ƒ.Color);
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
}
