import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';
import './HeroGraphic.css';

const LiquidSphere = () => {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.5}>
                <MeshDistortMaterial
                    color="#7000ff"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                />
            </Sphere>
        </Float>
    );
};

export const HeroGraphic = () => {
    return (
        <div className="hero-graphic-container">
            {/* 3D WebGL Background Layer */}
            <div className="hero-canvas-wrapper">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} color="#00F2FF" />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#FF00A0" />
                    <LiquidSphere />
                </Canvas>
            </div>

            {/* Floating Glassmorphic Code Snippet */}
            <div className="floating-graphic graphic-code hover-target">
                <div className="glass-header">
                    <span className="dot bg-red"></span>
                    <span className="dot bg-yellow"></span>
                    <span className="dot bg-green"></span>
                </div>
                <pre className="code-content">
                    <code>
                        <span className="keyword">const</span> <span className="entity">architect</span> = {'{\n'}
                        {'  '}role: <span className="string">'UI Engineer'</span>,\n
                        {'  '}focus: <span className="string">'Awwwards'</span>,\n
                        {'  '}execute: <span className="keyword">function</span>() {'{\n'}
                        {'    '}return <span className="string">'Perfection'</span>;\n
                        {'  '}{'}'}\n
                        {'}'};
                    </code>
                </pre>
            </div>

            {/* Floating UI Element Graphic */}
            <div className="floating-graphic graphic-ui hover-target">
                <div className="ui-chart">
                    <div className="bar bar-1"></div>
                    <div className="bar bar-2"></div>
                    <div className="bar bar-3"></div>
                </div>
                <div className="ui-text">
                    <span className="ui-label">PERFORMANCE</span>
                    <span className="ui-value">99.9%</span>
                </div>
            </div>
        </div>
    );
};
