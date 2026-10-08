"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Box3, Group, MathUtils, Object3D, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Model() {
 const root = useRef<Group>(null);
 const { pointer } = useThree();
 const [scene,setScene] = useRefState();
 useEffect(()=>{let alive=true; const loader=new GLTFLoader(); loader.load("/models/headphones.glb",data=>{if(alive)setScene(data.scene)},undefined,()=>{});return()=>{alive=false}},[setScene]);
 const prepared=useMemo(()=>{if(!scene)return null;const copy=scene.clone(true);const bounds=new Box3().setFromObject(copy);const size=new Vector3();const center=new Vector3();bounds.getSize(size);bounds.getCenter(center);copy.position.sub(center);const max=Math.max(size.x,size.y,size.z)||1;const wrapper=new Group();wrapper.add(copy);wrapper.scale.setScalar(2.6/max);return wrapper},[scene]);
 useFrame(({clock},delta)=>{if(!root.current)return;const time=clock.elapsedTime;root.current.position.y=Math.sin(time*.72)*.085;root.current.rotation.y=MathUtils.damp(root.current.rotation.y,-.3+pointer.x*.35+Math.sin(time*.19)*.12,2,delta);root.current.rotation.x=MathUtils.damp(root.current.rotation.x,pointer.y*-.13,2,delta);});
 if(!prepared)return null;
 return <group ref={root}><primitive object={prepared}/></group>;
}
function useRefState(): [Object3D|null,(value:Object3D)=>void] {
 const [value,setValue]=requireState<Object3D|null>(null);return [value,setValue];
}
import { useState as requireState } from "react";
export default function Headphones(){
 return <Canvas dpr={[1,1.5]} camera={{position:[0,0,4.3],fov:40}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} style={{width:"100%",height:"100%"}} fallback={null}>
  <ambientLight intensity={1.45}/><hemisphereLight intensity={1.1} color="#d6eaf2" groundColor="#1f3f4d"/><directionalLight position={[3,5,4]} intensity={2.8} color="#d6eaf2"/><pointLight position={[-4,1,2]} intensity={45} color="#5d8fa6" distance={12}/>
  <Suspense fallback={null}><Model/></Suspense>
 </Canvas>;
}