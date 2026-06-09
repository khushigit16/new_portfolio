import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Shared cursor state – updated from the Canvas's onPointerMove     */
/* ------------------------------------------------------------------ */
const cursor = { x: 0, y: 0 };

/* ------------------------------------------------------------------ */
/*  Utility: carbon-fibre–style dark material                         */
/* ------------------------------------------------------------------ */
function useBodyMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x0a0a0a),
        roughness: 0.55,
        metalness: 0.85,
      }),
    [],
  );
}

function useChromeMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a1a1a),
        roughness: 0.08,
        metalness: 1.0,
        envMapIntensity: 2.5,
      }),
    [],
  );
}

function useJointMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x111111),
        roughness: 0.4,
        metalness: 0.95,
      }),
    [],
  );
}

function useFaceGridMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x222222),
        roughness: 0.3,
        metalness: 0.9,
        emissive: new THREE.Color(0x111115),
        emissiveIntensity: 0.3,
      }),
    [],
  );
}

/* ------------------------------------------------------------------ */
/*  Head: chrome helmet with a face-plate dot grid                    */
/* ------------------------------------------------------------------ */
function Head() {
  const chrome = useChromeMaterial();
  const faceMat = useFaceGridMaterial();

  /* Dot grid emissive points on the face plate */
  const dots = useMemo(() => {
    const positions: [number, number, number][] = [];
    const rows = 4;
    const cols = 5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push([
          (c - (cols - 1) / 2) * 0.045,
          (r - (rows - 1) / 2) * 0.045 + 0.02,
          0.48,
        ]);
      }
    }
    return positions;
  }, []);

  return (
    <group position={[0, 0.15, 0]}>
      {/* Main helmet */}
      <mesh material={chrome}>
        <sphereGeometry args={[0.5, 64, 64]} />
      </mesh>

      {/* Face-plate recess */}
      <mesh position={[0, 0.02, 0.36]} material={faceMat}>
        <boxGeometry args={[0.36, 0.28, 0.16]} />
      </mesh>

      {/* Dot grid */}
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial
            color={0x334455}
            emissive={0x556677}
            emissiveIntensity={0.8}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Chin seam ring */}
      <mesh position={[0, -0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.04, 16, 32]} />
        <meshStandardMaterial color={0x111111} roughness={0.3} metalness={0.95} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Neck                                                              */
/* ------------------------------------------------------------------ */
function Neck() {
  const joint = useJointMaterial();
  return (
    <group position={[0, -0.35, 0]}>
      <mesh material={joint}>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 24]} />
      </mesh>
      {/* neck rings */}
      {[-0.06, 0, 0.06].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.14, 0.012, 8, 24]} />
          <meshStandardMaterial color={0x1a1a1a} roughness={0.25} metalness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Torso                                                             */
/* ------------------------------------------------------------------ */
function Torso() {
  const body = useBodyMaterial();
  return (
    <group position={[0, -0.95, 0]}>
      {/* Upper torso */}
      <mesh material={body}>
        <cylinderGeometry args={[0.38, 0.28, 0.9, 32]} />
      </mesh>
      {/* Chest plate highlight */}
      <mesh position={[0, 0.15, 0.27]}>
        <boxGeometry args={[0.46, 0.5, 0.06]} />
        <meshStandardMaterial color={0x080808} roughness={0.6} metalness={0.8} />
      </mesh>
      {/* Center chest seam */}
      <mesh position={[0, 0.1, 0.31]}>
        <boxGeometry args={[0.01, 0.55, 0.01]} />
        <meshStandardMaterial color={0x222222} roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Shoulder pad                                                      */
/* ------------------------------------------------------------------ */
function ShoulderPad({ side }: { side: "left" | "right" }) {
  const xSign = side === "left" ? -1 : 1;
  const body = useBodyMaterial();
  return (
    <group position={[xSign * 0.52, -0.52, 0]}>
      <mesh material={body} rotation={[0, 0, xSign * -0.3]}>
        <sphereGeometry args={[0.2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh material={body}>
        <sphereGeometry args={[0.17, 24, 24]} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Arm (upper + forearm + hand)                                      */
/* ------------------------------------------------------------------ */
function Arm({ side }: { side: "left" | "right" }) {
  const xSign = side === "left" ? -1 : 1;
  const body = useBodyMaterial();
  const joint = useJointMaterial();
  const armRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!armRef.current) return;
    /* subtle sway reacting to cursor */
    const targetZ = cursor.x * xSign * 0.15;
    armRef.current.rotation.z = THREE.MathUtils.lerp(
      armRef.current.rotation.z,
      xSign * -0.18 + targetZ,
      0.04,
    );
  });

  return (
    <group ref={armRef} position={[xSign * 0.55, -0.75, 0]}>
      {/* Upper arm */}
      <mesh material={body} position={[xSign * 0.05, -0.22, 0]}>
        <capsuleGeometry args={[0.08, 0.28, 8, 16]} />
      </mesh>
      {/* Elbow joint */}
      <mesh material={joint} position={[xSign * 0.08, -0.45, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>
      {/* Forearm */}
      <mesh material={body} position={[xSign * 0.1, -0.68, 0]}>
        <capsuleGeometry args={[0.065, 0.26, 8, 16]} />
      </mesh>
      {/* Hand */}
      <group position={[xSign * 0.12, -0.9, 0]}>
        <mesh material={body}>
          <boxGeometry args={[0.1, 0.12, 0.06]} />
        </mesh>
        {/* Fingers */}
        {[[-0.03, -0.09, 0], [0, -0.1, 0], [0.03, -0.09, 0]].map((pos, i) => (
          <mesh key={i} material={joint} position={pos as [number, number, number]}>
            <capsuleGeometry args={[0.015, 0.04, 4, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Robot group – head-tracking + body tilt                           */
/* ------------------------------------------------------------------ */
function Robot() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (headRef.current) {
      /* Head follows cursor */
      const targetRotY = cursor.x * 0.5;
      const targetRotX = -cursor.y * 0.35;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.06);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.06);
    }

    if (groupRef.current) {
      /* Subtle body sway */
      const targetBodyY = cursor.x * 0.12;
      const targetBodyX = -cursor.y * 0.06;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetBodyY, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetBodyX, 0.03);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Head group – tracked independently */}
      <group ref={headRef}>
        <Head />
      </group>
      <Neck />
      <Torso />
      <ShoulderPad side="left" />
      <ShoulderPad side="right" />
      <Arm side="left" />
      <Arm side="right" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Lighting rig – dramatic dark studio                               */
/* ------------------------------------------------------------------ */
function Lighting() {
  return (
    <>
      {/* Key light from upper-right */}
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.2}
        color={0xeeeeff}
        castShadow={false}
      />
      {/* Rim light – left */}
      <pointLight position={[-3, 2, -1]} intensity={0.8} color={0x8888bb} />
      {/* Rim light – right */}
      <pointLight position={[3, 1, -2]} intensity={0.6} color={0x8888aa} />
      {/* Subtle fill from below */}
      <pointLight position={[0, -3, 1]} intensity={0.15} color={0x444466} />
      {/* Ambient – very low to keep it dark */}
      <ambientLight intensity={0.08} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating particles for atmosphere                                 */
/* ------------------------------------------------------------------ */
function Particles() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 1,
        ),
        speed: 0.002 + Math.random() * 0.004,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const p = particleData[i];
      dummy.position.set(
        p.position.x + Math.sin(t * 0.3 + p.offset) * 0.3,
        p.position.y + Math.cos(t * p.speed * 100 + p.offset) * 0.2,
        p.position.z,
      );
      const scale = 0.008 + Math.sin(t * 2 + p.offset) * 0.004;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={0x555566} transparent opacity={0.5} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene wrapper                                                     */
/* ------------------------------------------------------------------ */
function Scene() {
  const { size } = useThree();

  const handlePointerMove = useCallback(
    (e: THREE.Event & { clientX?: number; clientY?: number; nativeEvent?: PointerEvent }) => {
      const ne = (e as any).nativeEvent as PointerEvent | undefined;
      if (!ne) return;
      /* Normalise to -1…1 */
      cursor.x = (ne.clientX / size.width) * 2 - 1;
      cursor.y = (ne.clientY / size.height) * 2 - 1;
    },
    [size],
  );

  return (
    <group onPointerMove={handlePointerMove as any}>
      {/* Invisible plane to capture pointer events */}
      <mesh visible={false}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial />
      </mesh>
      <Lighting />
      <Particles />
      <Robot />
      <Environment preset="night" />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                */
/* ------------------------------------------------------------------ */
export function AvatarBust() {
  const handleCanvasPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      cursor.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      cursor.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    },
    [],
  );

  return (
    <div
      className="w-full h-full"
      style={{ background: "#000" }}
      onPointerMove={handleCanvasPointerMove}
    >
      <Canvas
        camera={{ position: [0, 0.2, 2.8], fov: 40 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ background: "#000" }}
      >
        <color attach="background" args={["#000"]} />
        <Scene />
      </Canvas>
    </div>
  );
}
