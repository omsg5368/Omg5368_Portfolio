import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ArchitectureNode {
  mesh: THREE.Mesh;
  id: string;
  name: string;
  tech: string;
  role: string;
}

interface CyberMatrixCanvasProps {
  onSelectSector?: (sectorId: string) => void;
  activeSector?: string | null;
}

export const CyberMatrixCanvas: React.FC<CyberMatrixCanvasProps> = ({ onSelectSector }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<{ name: string; tech: string; role: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting - Elegant, soft studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    keyLight.position.set(5, 8, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x10b981, 1.2);
    fillLight.position.set(-6, -4, 6);
    scene.add(fillLight);

    // Grid Floor - Subtle architectural plane
    const gridHelper = new THREE.GridHelper(16, 16, 0x334155, 0x1e293b);
    gridHelper.position.y = -3.2;
    scene.add(gridHelper);

    // Root Architecture Group
    const archGroup = new THREE.Group();
    scene.add(archGroup);

    const nodes: ArchitectureNode[] = [];

    // Helper material creator
    const createMat = (color: number, opacity = 0.9) => new THREE.MeshStandardMaterial({
      color,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity
    });

    // Node 1: Mobile Client / Edge Node (Flutter) - Left
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(-4.2, 0, 0);

    const phoneBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 2.8, 0.2),
      createMat(0x0f172a)
    );
    phoneGroup.add(phoneBody);

    const phoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 2.5),
      new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 })
    );
    phoneScreen.position.z = 0.11;
    phoneGroup.add(phoneScreen);

    phoneBody.userData = {
      id: 'client',
      name: 'Mobile Edge Client',
      tech: 'Android / Flutter',
      role: 'Captures compute-heavy batch tasks and queues them for cloud offload.'
    };
    nodes.push({ mesh: phoneBody, id: 'client', name: 'Mobile Edge Client', tech: 'Android / Flutter', role: 'Captures compute-heavy batch tasks and queues them for cloud offload.' });
    archGroup.add(phoneGroup);

    // Node 2: Cloud Compute / Task Ingest Hub - Center
    const serverGroup = new THREE.Group();
    serverGroup.position.set(0, 0.4, 0);

    const serverRack = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 2.4, 2.4),
      createMat(0x1e293b)
    );
    serverRack.userData = {
      id: 'compute',
      name: 'Cloud Task Offload Engine',
      tech: 'AWS Compute & Worker Queues',
      role: 'Parses incoming task payloads and executes background transformations.'
    };
    serverGroup.add(serverRack);

    // Wireframe cage around server
    const serverWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.4, 2.4, 2.4)),
      new THREE.LineBasicMaterial({ color: 0x38bdf8 })
    );
    serverGroup.add(serverWire);

    nodes.push({ mesh: serverRack, id: 'compute', name: 'Cloud Task Offload Engine', tech: 'AWS Compute & Worker Queues', role: 'Parses incoming task payloads and executes background transformations.' });
    archGroup.add(serverGroup);

    // Node 3: AWS S3 Object Storage Bucket - Top Right
    const s3Group = new THREE.Group();
    s3Group.position.set(4.2, 1.8, 0);

    const s3Mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 1.4, 24),
      createMat(0x0284c7)
    );
    s3Mesh.userData = {
      id: 'storage',
      name: 'Object Storage Tier',
      tech: 'Amazon S3',
      role: 'Stores binary assets, processed outputs, and batch result archives.'
    };
    s3Group.add(s3Mesh);

    const s3Lid = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 0.15, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
    );
    s3Lid.position.y = 0.7;
    s3Group.add(s3Lid);

    nodes.push({ mesh: s3Mesh, id: 'storage', name: 'Object Storage Tier', tech: 'Amazon S3', role: 'Stores binary assets, processed outputs, and batch result archives.' });
    archGroup.add(s3Group);

    // Node 4: Firebase Real-time DB - Bottom Right
    const dbGroup = new THREE.Group();
    dbGroup.position.set(4.2, -1.8, 0);

    const dbLayer1 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.35, 24), createMat(0x10b981));
    const dbLayer2 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.35, 24), createMat(0x10b981));
    const dbLayer3 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.35, 24), createMat(0x10b981));
    dbLayer1.position.y = -0.5;
    dbLayer2.position.y = 0;
    dbLayer3.position.y = 0.5;

    dbGroup.add(dbLayer1);
    dbGroup.add(dbLayer2);
    dbGroup.add(dbLayer3);

    dbLayer2.userData = {
      id: 'database',
      name: 'State Synchronization & Auth',
      tech: 'Firebase / NoSQL',
      role: 'Maintains user session security and provides real-time task status updates.'
    };
    nodes.push({ mesh: dbLayer2, id: 'database', name: 'State Synchronization & Auth', tech: 'Firebase / NoSQL', role: 'Maintains user session security and provides real-time task status updates.' });
    archGroup.add(dbGroup);

    // Connecting Network Pipeline (Curves)
    const curve1 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-3.2, 0, 0),
      new THREE.Vector3(-1.6, 0.8, 0),
      new THREE.Vector3(-1.3, 0.4, 0)
    );
    const lineGeo1 = new THREE.BufferGeometry().setFromPoints(curve1.getPoints(24));
    const line1 = new THREE.Line(lineGeo1, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 }));
    archGroup.add(line1);

    const curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(1.3, 0.8, 0),
      new THREE.Vector3(2.6, 1.4, 0),
      new THREE.Vector3(3.1, 1.8, 0)
    );
    const lineGeo2 = new THREE.BufferGeometry().setFromPoints(curve2.getPoints(24));
    const line2 = new THREE.Line(lineGeo2, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 }));
    archGroup.add(line2);

    const curve3 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(1.3, 0, 0),
      new THREE.Vector3(2.6, -1.0, 0),
      new THREE.Vector3(3.1, -1.8, 0)
    );
    const lineGeo3 = new THREE.BufferGeometry().setFromPoints(curve3.getPoints(24));
    const line3 = new THREE.Line(lineGeo3, new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 }));
    archGroup.add(line3);

    // Animated Data Packets along pipelines
    const packetGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const packet1 = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    const packet2 = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    const packet3 = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    archGroup.add(packet1);
    archGroup.add(packet2);
    archGroup.add(packet3);

    // Interaction & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    const targetRot = { x: 0, y: 0 };
    const currentRot = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mouse.x = x;
      mouse.y = y;
      targetRot.y = x * 0.25;
      targetRot.x = -y * 0.15;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const data = hit.userData;
        if (data && data.name) {
          setHoveredNode({
            name: data.name,
            tech: data.tech,
            role: data.role,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          });
          document.body.style.cursor = 'pointer';
        }
      } else {
        setHoveredNode(null);
        document.body.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (onSelectSector) {
          onSelectSector('cloud-systems');
        }
      }
    };

    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    currentMount.addEventListener('mousemove', handleMouseMove);
    currentMount.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      currentRot.x += (targetRot.x - currentRot.x) * 0.05;
      currentRot.y += (targetRot.y - currentRot.y) * 0.05;

      archGroup.rotation.y = currentRot.y;
      archGroup.rotation.x = currentRot.x;

      // Subtle float
      phoneGroup.position.y = Math.sin(time * 1.5) * 0.08;
      serverGroup.rotation.y = time * 0.2;
      s3Group.rotation.y = time * 0.15;

      // Animate packets along curves
      const t1 = (time * 0.6) % 1;
      const t2 = (time * 0.5 + 0.3) % 1;
      const t3 = (time * 0.45 + 0.6) % 1;

      packet1.position.copy(curve1.getPoint(t1));
      packet2.position.copy(curve2.getPoint(t2));
      packet3.position.copy(curve3.getPoint(t3));

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      currentMount.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'default';

      renderer.dispose();
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [onSelectSector]);

  return (
    <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden bg-[#0b1329]/70 border border-slate-800">
      <div ref={mountRef} className="w-full h-full" />

      {/* Clean Technical Caption */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2.5 py-1 rounded-md">
          SYSTEM TOPOLOGY · CLOUD BLEND
        </span>
        <p className="text-[11px] text-slate-400 font-mono mt-1">
          Interactive 3D model: Edge Client → Ingest Hub → S3 & Firebase
        </p>
      </div>

      {/* Hover Card */}
      {hoveredNode && (
        <div
          className="absolute z-20 pointer-events-none bg-slate-900/95 border border-slate-700 text-white p-3 rounded-lg shadow-xl backdrop-blur-md max-w-xs transform -translate-x-1/2 -translate-y-16 transition-all duration-75"
          style={{ left: hoveredNode.x, top: hoveredNode.y }}
        >
          <div className="text-xs font-bold text-sky-400 font-mono">{hoveredNode.tech}</div>
          <div className="text-sm font-semibold text-white mt-0.5">{hoveredNode.name}</div>
          <p className="text-xs text-slate-300 mt-1 leading-normal">{hoveredNode.role}</p>
        </div>
      )}

      {/* Legend Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> Flutter Edge
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300" /> AWS Compute
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> S3 & Firebase
          </span>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Hover nodes to inspect architecture details
        </span>
      </div>
    </div>
  );
};
