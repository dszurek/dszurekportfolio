import { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';
import './AnimatedBackground.css';

const defaultColors = ['#F5E6D3', '#8B5A3C', '#2D4A3E'];

const hexToRgb = hex => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

// Simple vertex shader for particles - position is passed directly
const particleVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec3 color;
  attribute float size;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    vec4 mvPos = viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_PointSize = size * (10.0 / length(mvPos.xyz));
    gl_Position = projectionMatrix * mvPos;
  }
`;

const particleFragment = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if(d > 0.5) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

// Simple shader for lines
const lineVertex = /* glsl */ `
  attribute vec3 position;
  attribute float opacity;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  
  varying float vOpacity;
  
  void main() {
    vOpacity = opacity;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;

const lineFragment = /* glsl */ `
  precision highp float;
  varying float vOpacity;
  uniform vec3 uColor;
  
  void main() {
    gl_FragColor = vec4(uColor, vOpacity);
  }
`;

const AnimatedBackground = ({
  particleCount = 200, // Increased default count
  particleSpread = 10,
  speed = 0.05,
  particleColors = defaultColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 1,
  cameraDistance = 20,
  className = ''
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 9999, y: 9999 }); // Start off-screen

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize, false);
    resize();

    const handleMouseMove = e => {
      // Convert to normalized device coordinates (-1 to 1)
      // We need to account for the camera view. 
      // For simple 2D interaction in 3D space, we project mouse to z=0 plane.
      
      // Calculate aspect ratio
      const aspect = gl.canvas.width / gl.canvas.height;
      
      // Convert mouse to NDCs
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Calculate world coordinates at z=0
      // Height at z=0 depends on FOV and distance
      const vFov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFov / 2) * cameraDistance;
      const width = height * aspect;
      
      mouseRef.current = { 
        x: ndcX * width / 2, 
        y: ndcY * height / 2 
      };
    };

    if (moveParticlesOnHover) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Initialize particles
    const count = particleCount;
    const particlesData = [];
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() * 2 - 1) * particleSpread;
      const y = (Math.random() * 2 - 1) * particleSpread;
      const z = (Math.random() * 2 - 1) * particleSpread * 0.5; // Flatter z-spread
      
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      
      particlesData.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        vz: (Math.random() - 0.5) * speed,
        color: col,
        size: Math.random() * 3 + 3, // Increased size
        phase: Math.random() * Math.PI * 2
      });
    }

    // Particle Geometry
    const pGeometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array(count * 3) },
      color: { size: 3, data: new Float32Array(count * 3) },
      size: { size: 1, data: new Float32Array(count) }
    });

    // Set static attributes
    for (let i = 0; i < count; i++) {
      pGeometry.attributes.color.data.set(particlesData[i].color, i * 3);
      pGeometry.attributes.size.data[i] = particlesData[i].size;
    }
    pGeometry.attributes.color.needsUpdate = true;
    pGeometry.attributes.size.needsUpdate = true;

    const pProgram = new Program(gl, {
      vertex: particleVertex,
      fragment: particleFragment,
      transparent: true,
      depthTest: false
    });

    const particlesMesh = new Mesh(gl, { mode: gl.POINTS, geometry: pGeometry, program: pProgram });

    // Line Geometry
    // Max lines = count * (count - 1) / 2, but we limit to avoid performance hit
    const maxLines = count * 10; 
    const lGeometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array(maxLines * 2 * 3) },
      opacity: { size: 1, data: new Float32Array(maxLines * 2) }
    });

    const lProgram = new Program(gl, {
      vertex: lineVertex,
      fragment: lineFragment,
      uniforms: {
        uColor: { value: new Float32Array([0.54, 0.35, 0.23]) } // Leather brown color
      },
      transparent: true,
      depthTest: false
    });

    const linesMesh = new Mesh(gl, { mode: gl.LINES, geometry: lGeometry, program: lProgram });

    let animationFrameId;
    let time = 0;
    
    // Check for touch capability to disable interaction physics
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const update = () => {
      animationFrameId = requestAnimationFrame(update);
      time += 0.01;

      const positions = pGeometry.attributes.position.data;
      const linePositions = lGeometry.attributes.position.data;
      const lineOpacities = lGeometry.attributes.opacity.data;
      let lineIndex = 0;

      // Update particles
      for (let i = 0; i < count; i++) {
        const p = particlesData[i];
        
        // Natural floating movement
        p.x += Math.sin(time * 0.5 + p.phase) * 0.002 * speed * 10;
        p.y += Math.cos(time * 0.3 + p.phase) * 0.002 * speed * 10;
        
        // Mouse repulsion - skip on touch devices
        if (!isTouch) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 3; // Repulsion radius
          
          if (dist < radius) {
            const force = (radius - dist) / radius;
            const angle = Math.atan2(dy, dx);
            const push = force * 0.1;
            
            p.x += Math.cos(angle) * push;
            p.y += Math.sin(angle) * push;
          } else {
            // Return to base (with some drift)
            const bdx = p.baseX - p.x;
            const bdy = p.baseY - p.y;
            p.x += bdx * 0.01;
            p.y += bdy * 0.01;
          }
        } else {
           // Just return to base if drifted (simple spring)
           const bdx = p.baseX - p.x;
           const bdy = p.baseY - p.y;
           p.x += bdx * 0.01;
           p.y += bdy * 0.01;
        }

        // Update buffer
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      }
      pGeometry.attributes.position.needsUpdate = true;

      // Update lines
      const connectionDist = 3.5; // Distance threshold
      
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particlesData[i].x - particlesData[j].x;
          const dy = particlesData[i].y - particlesData[j].y;
          const dz = particlesData[i].z - particlesData[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDist) {
            if (lineIndex >= maxLines) break;

            const opacity = 1.0 - (dist / connectionDist);
            const idx = lineIndex * 2; // 2 vertices per line

            // Vertex 1
            linePositions[idx * 3] = particlesData[i].x;
            linePositions[idx * 3 + 1] = particlesData[i].y;
            linePositions[idx * 3 + 2] = particlesData[i].z;
            lineOpacities[idx] = opacity;

            // Vertex 2
            linePositions[(idx + 1) * 3] = particlesData[j].x;
            linePositions[(idx + 1) * 3 + 1] = particlesData[j].y;
            linePositions[(idx + 1) * 3 + 2] = particlesData[j].z;
            lineOpacities[idx + 1] = opacity;

            lineIndex++;
          }
        }
      }

      lGeometry.attributes.position.needsUpdate = true;
      lGeometry.attributes.opacity.needsUpdate = true;
      lGeometry.setDrawRange(0, lineIndex * 2);

      renderer.render({ scene: particlesMesh, camera });
      // Render lines on top (or same pass, doesn't matter much for additive)
      renderer.render({ scene: linesMesh, camera, clear: false });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      if (moveParticlesOnHover) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    cameraDistance
  ]);

  return <div ref={containerRef} className={`animated-background ${className}`} />;
};

export default AnimatedBackground;
