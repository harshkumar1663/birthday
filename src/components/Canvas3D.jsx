import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const LIGHT_PRESETS = {
  warm: {
    bg: '#f8d7c8',
    fog: '#e9bca9',
    ambient: '#fff0d8',
    key: '#ffd1a8',
    fill: '#ffb2bf',
    ambientIntensity: 0.9,
    keyIntensity: 1.05,
    fillIntensity: 0.74
  },
  dim: {
    bg: '#e6e9f4',
    fog: '#d6dced',
    ambient: '#f2f5ff',
    key: '#e3e9ff',
    fill: '#c7d2f5',
    ambientIntensity: 0.8,
    keyIntensity: 0.92,
    fillIntensity: 0.62
  },
  bright: {
    bg: '#fff2cf',
    fog: '#ffe6b6',
    ambient: '#fffaf0',
    key: '#ffe4b8',
    fill: '#ffd0a8',
    ambientIntensity: 1.02,
    keyIntensity: 1.28,
    fillIntensity: 0.92
  },
  memory: {
    bg: '#f2e8f6',
    fog: '#e2d8ea',
    ambient: '#faf3ff',
    key: '#f3e7ff',
    fill: '#d9c5f5',
    ambientIntensity: 0.9,
    keyIntensity: 1.0,
    fillIntensity: 0.68
  }
}

function ParticleField({ lighting = 'memory', isMobile = false }) {
  const pointsRef = useRef(null)
  const geomRef = useRef(null)
  const frameRef = useRef(0)

  const { basePositions, offsets } = useMemo(() => {
    const count = isMobile ? 700 : 1400
    const positions = new Float32Array(count * 3)
    const randomOffsets = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 90
      positions[i3 + 1] = (Math.random() - 0.5) * 70
      positions[i3 + 2] = (Math.random() - 0.5) * 80
      randomOffsets[i] = Math.random() * Math.PI * 2
    }

    return { basePositions: positions, offsets: randomOffsets }
  }, [isMobile])

  const color = useMemo(() => {
    const toneMap = {
      warm: '#ff8fa8',
      dim: '#9eb8ff',
      bright: '#ffd78f',
      memory: '#c7a8ef'
    }

    return toneMap[lighting] || toneMap.memory
  }, [lighting])

  useFrame(({ clock }) => {
    frameRef.current += 1
    if (isMobile && frameRef.current % 2 !== 0) return

    const geometry = geomRef.current
    const cloud = pointsRef.current
    if (!geometry || !cloud) return

    const positionAttr = geometry.attributes.position
    const arr = positionAttr.array
    const t = clock.elapsedTime

    for (let i = 0; i < offsets.length; i += 1) {
      const i3 = i * 3
      const amp = isMobile ? 0.72 : 1
      arr[i3] = basePositions[i3] + Math.sin(t * 0.18 + offsets[i]) * 0.12 * amp
      arr[i3 + 1] = basePositions[i3 + 1] + Math.cos(t * 0.24 + offsets[i] * 0.7) * 0.16 * amp
      arr[i3 + 2] = basePositions[i3 + 2] + Math.sin(t * 0.13 + offsets[i] * 1.6) * 0.09 * amp
    }

    positionAttr.needsUpdate = true
    cloud.rotation.y += isMobile ? 0.0002 : 0.00035
    cloud.rotation.x += isMobile ? 0.00008 : 0.00015
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          array={basePositions}
          count={basePositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={isMobile ? 0.16 : 0.14}
        transparent
        opacity={isMobile ? 0.82 : 0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function CameraDirector({ sceneConfig, transitionPhase, isMobile = false }) {
  const { camera } = useThree()
  const lookAtRef = useRef({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    if (!sceneConfig?.camera) return
    const target = sceneConfig.camera

    gsap.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: target.duration,
      ease: 'power2.inOut'
    })

    gsap.to(lookAtRef.current, {
      x: target.lookAt[0],
      y: target.lookAt[1],
      z: target.lookAt[2],
      duration: target.duration,
      ease: 'power2.inOut'
    })

    const fovTarget = 50 / target.zoom
    gsap.to(camera, {
      fov: fovTarget,
      duration: target.duration,
      ease: 'power2.inOut',
      onUpdate: () => camera.updateProjectionMatrix()
    })
  }, [camera, sceneConfig])

  useFrame(({ clock }) => {
    if (!sceneConfig?.camera) return

    const t = clock.elapsedTime
    const drift = sceneConfig.camera.drift || 0.15
    const transitionDamping = transitionPhase === 'out' ? 0.0034 : isMobile ? 0.0052 : 0.006

    const driftScale = isMobile ? 0.72 : 1
    const targetX = sceneConfig.camera.pan[0] + Math.sin(t * 0.2) * drift * driftScale
    const targetY = sceneConfig.camera.pan[1] + Math.cos(t * 0.17) * drift * 0.65 * driftScale

    camera.position.x += (targetX - camera.position.x) * transitionDamping
    camera.position.y += (targetY - camera.position.y) * transitionDamping

    camera.lookAt(
      lookAtRef.current.x + Math.sin(t * 0.12) * 0.08,
      lookAtRef.current.y + Math.cos(t * 0.16) * 0.06,
      lookAtRef.current.z
    )
    camera.updateProjectionMatrix()
  })

  return null
}

function LightingSystem({ lighting = 'memory' }) {
  const ambientRef = useRef(null)
  const keyRef = useRef(null)
  const fillRef = useRef(null)
  const { scene } = useThree()

  const target = useMemo(() => {
    return LIGHT_PRESETS[lighting] || LIGHT_PRESETS.memory
  }, [lighting])

  useEffect(() => {
    if (!scene.background) {
      scene.background = new THREE.Color(target.bg)
    }

    if (!scene.fog) {
      scene.fog = new THREE.Fog(target.fog, 22, 130)
    }
  }, [scene, target.bg, target.fog])

  useFrame(() => {
    if (!ambientRef.current || !keyRef.current || !fillRef.current) return

    const lerpAmt = 0.045

    ambientRef.current.intensity = THREE.MathUtils.lerp(
      ambientRef.current.intensity,
      target.ambientIntensity,
      lerpAmt
    )
    keyRef.current.intensity = THREE.MathUtils.lerp(
      keyRef.current.intensity,
      target.keyIntensity,
      lerpAmt
    )
    fillRef.current.intensity = THREE.MathUtils.lerp(
      fillRef.current.intensity,
      target.fillIntensity,
      lerpAmt
    )

    ambientRef.current.color.lerp(new THREE.Color(target.ambient), lerpAmt)
    keyRef.current.color.lerp(new THREE.Color(target.key), lerpAmt)
    fillRef.current.color.lerp(new THREE.Color(target.fill), lerpAmt)

    if (scene.background) {
      scene.background.lerp(new THREE.Color(target.bg), lerpAmt * 0.7)
    }

    if (scene.fog?.color) {
      scene.fog.color.lerp(new THREE.Color(target.fog), lerpAmt * 0.8)
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={target.ambientIntensity} color={target.ambient} />
      <directionalLight
        ref={keyRef}
        position={[12, 10, 8]}
        intensity={target.keyIntensity}
        color={target.key}
      />
      <pointLight
        ref={fillRef}
        position={[-8, -5, 12]}
        intensity={target.fillIntensity}
        color={target.fill}
      />
    </>
  )
}

export default function Canvas3D({ scene, transitionPhase }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const update = () => setIsMobile(mediaQuery.matches)
    update()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', update)
      return () => mediaQuery.removeEventListener('change', update)
    }

    mediaQuery.addListener(update)
    return () => mediaQuery.removeListener(update)
  }, [])

  return (
    <div className="canvas-container">
      <Canvas
        camera={{
          position: [0, 0, 24],
          fov: isMobile ? 54 : 52
        }}
        dpr={isMobile ? [1, 1.35] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: false, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
      >
        <LightingSystem lighting={scene?.lighting} />
        <ParticleField lighting={scene?.lighting} isMobile={isMobile} />
        <CameraDirector sceneConfig={scene} transitionPhase={transitionPhase} isMobile={isMobile} />
        <Preload all />
      </Canvas>

      <div className={`vignette ${scene?.emotionalPeak ? 'peak' : ''}`} />
    </div>
  )
}
