"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import ScrambleText from "@/components/ScrambleText";
import HalftoneFooter from "@/components/ui/HalftoneFooter";
import { useReducedMotion, useScrollChoreography } from "@/lib/useScrollChoreography";

const Headphones = dynamic(() => import("@/components/Headphones"), { ssr: false });
type Lang = "fr" | "en";
type ModelState = "loading" | "ready" | "error";
const copy = {
 fr: {
  nav:["Accueil","À propos","Compétences","Contact"], eyebrow:"CYBERSÉCURITÉ  /  DÉVELOPPEMENT WEB",
  hello:"Bonjour, moi c’est", title:"Emma DaSilva.", tag:"Curieuse de nature. Technique par conviction.",
  intro:"Je m'intéresse à la cybersécurité et à la programmation. J'aime comprendre les problèmes, explorer leur logique et construire des solutions fiables.",
  discover:"Découvrir mon profil", reach:"Me contacter", location:"Cotonou, Bénin",
  about:"À propos", aboutLead:"Comprendre avant d’agir.", aboutBody:"Je suis Emma DaSilva, développeuse web junior avec un intérêt croissant pour la cybersécurité. Le développement m’a appris à construire des applications. Aujourd’hui, je m’intéresse aussi à la manière dont elles fonctionnent, communiquent et se protègent.", aboutBody2:"J’apprends par la pratique, avec une attention particulière à Linux, aux réseaux et à l’analyse technique. Mon objectif est de continuer à progresser et de construire une carrière dans la cybersécurité.",
  skills:"Compétences", skillsIntro:"Un socle technique que je développe et approfondis.", categories:["Programmation","Développement web","Sécurité & outils"],
  contact:"Contact", contactLead:"Parlons technique.", contactBody:"Je suis ouverte aux opportunités de stage, aux collaborations techniques et aux échanges autour de la cybersécurité et du développement.", mail:"M’envoyer un e-mail", footer:"Tous droits réservés.",
  menuOpen:"Ouvrir le menu", menuClose:"Fermer le menu"
 },
 en: {
  nav:["Home","About","Skills","Contact"], eyebrow:"CYBERSECURITY  /  WEB DEVELOPMENT",
  hello:"Hi, I’m", title:"Emma DaSilva.", tag:"Curiosity first. Engineering always.",
  intro:"I'm interested in cybersecurity and programming. I enjoy understanding problems, exploring the logic behind them, and building reliable solutions.",
  discover:"About me", reach:"Get in touch", location:"Cotonou, Benin",
  about:"About", aboutLead:"Understand before you act.", aboutBody:"I'm Emma DaSilva, a junior web developer with a growing interest in cybersecurity. Development taught me how to build applications. Today, I'm also interested in how they work, communicate, and stay protected.", aboutBody2:"I learn through hands-on practice, with a particular focus on Linux, networking, and technical analysis. My goal is to keep developing my skills and build a career in cybersecurity.",
  skills:"Skills", skillsIntro:"A technical foundation I'm building on.", categories:["Programming","Web development","Security & tools"],
  contact:"Contact", contactLead:"Let's talk technology.", contactBody:"I'm open to internships, technical collaborations, and conversations about cybersecurity and development.", mail:"Send an email", footer:"All rights reserved.",
  menuOpen:"Open menu", menuClose:"Close menu"
 }
};
const groups = [["Python","JavaScript","C"],["HTML","CSS","React","Node.js"],["Linux","Kali Linux","Bash","Git","GitHub"]];
const ids = ["accueil","apropos","competences","contact"] as const;
const index = (i: number) => String(i + 1).padStart(2, "0");
const noop = () => () => {};
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Page() {
 const [lang,setLang] = useState<Lang>("fr");
 const [menu,setMenu] = useState(false);
 const [model,setModel] = useState<ModelState>("loading");
 const [loaded,setLoaded] = useState<number | null>(null);
 const reducedMotion = useReducedMotion();
 const { active, revealed, scrolled } = useScrollChoreography(ids);
 usePointerParallax();
 const t=copy[lang];

 useEffect(()=>{document.documentElement.lang=lang;document.title=lang==="fr"?"Emma DaSilva | Cybersécurité & Développement Web":"Emma DaSilva | Cybersecurity & Web Development";},[lang]);
 // Sections below the fold only hide once JS is running, so the page stays readable without it.
 const ready=useSyncExternalStore(noop,()=>true,()=>false);
 useEffect(()=>{
  if(!menu)return;
  const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenu(false);};
  window.addEventListener("keydown",close);
  return()=>window.removeEventListener("keydown",close);
 },[menu]);

 const onProgress=useCallback((fraction:number|null)=>setLoaded(fraction===null?null:Math.round(fraction*100)),[]);
 const onReady=useCallback(()=>setModel("ready"),[]);
 const onError=useCallback(()=>setModel("error"),[]);
 const shown=(i:number)=>i<revealed;
 const label=(i:number,text:string)=><span className={styles.smallLabel}><span className={styles.index}>{index(i)}</span><ScrambleText text={text} active={shown(i)} reducedMotion={reducedMotion}/></span>;

 return <div className={styles.site} data-ready={ready||undefined} data-motion={reducedMotion?"reduced":"full"}>
  <div className={styles.backdrop} aria-hidden="true"/>
  <div className={styles.stage} data-state={model}>
   {model==="error"
    ?<div className={styles.modelFallback}><span className={styles.orbit} aria-hidden="true"/><span className={styles.fallbackLabel}>3D / 01</span></div>
    :<Headphones label={t.model} reducedMotion={reducedMotion} onProgress={onProgress} onReady={onReady} onError={onError}/>}
  </div>

  <header className={styles.header} data-scrolled={scrolled||menu||undefined}><div className={styles.headerInner}>
    <a className={styles.brand} href="#accueil" aria-label="Emma DaSilva — home">ED<span>.</span></a>
    <nav aria-label={lang==="fr"?"Navigation principale":"Main navigation"} className={menu?styles.navOpen:styles.nav}>
      {t.nav.map((text,i)=><a key={ids[i]} href={"#"+ids[i]} onClick={()=>setMenu(false)} aria-current={active===i?"location":undefined}><span className={styles.navIndex} aria-hidden="true">{index(i)}</span>{text}</a>)}
    </nav>
    <div className={styles.controls}><div className={styles.lang} role="group" aria-label="Language / Langue"><button onClick={()=>setLang("fr")} className={lang==="fr"?styles.current:""} aria-pressed={lang==="fr"}>FR</button><span aria-hidden="true">/</span><button onClick={()=>setLang("en")} className={lang==="en"?styles.current:""} aria-pressed={lang==="en"}>EN</button></div><button className={styles.menu} onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?t.menuClose:t.menuOpen}>{menu?"×":"☰"}</button></div>
  </div></header>

  <main>
   <section className={styles.hero} id="accueil">
    <div className={styles.heroCopy}>
     <p className={`${styles.eyebrow} ${styles.enter}`} style={delay(0.1)}><span className={styles.dot}/>{t.eyebrow}</p>
     <h1>
      <span className={styles.line}><span className={styles.lineInner} style={delay(0.2)}>{t.hello}</span></span>
      <span className={styles.line}><strong className={styles.lineInner} style={delay(0.32)}>{t.title}</strong></span>
     </h1>
     <p className={`${styles.tag} ${styles.enter}`} style={delay(0.5)}>{t.tag}</p>
     <p className={`${styles.heroIntro} ${styles.enter}`} style={delay(0.6)}>{t.intro}</p>
     <div className={`${styles.actions} ${styles.enter}`} style={delay(0.7)}><a className={styles.primary} href="#apropos">{t.discover}<span aria-hidden="true">↗</span></a><a className={styles.secondary} href="#contact">{t.reach}<span aria-hidden="true">↗</span></a></div>
    </div>
    <div className={`${styles.heroFoot} ${styles.enter}`} style={delay(0.9)}>
     <span>{t.location}</span>
     <span className={styles.modelStatus} aria-hidden="true">
      {model==="loading"?<>{t.loading}{loaded!==null&&<> · {loaded}%</>}<span className={styles.loadBar} style={{"--p":(loaded??35)/100} as CSSProperties}/></>:model==="ready"?<span className={styles.dragHint}>{t.drag}</span>:"3D / 01"}
     </span>
     <span>SCROLL ↓</span>
    </div>
   </section>

   <section className={`${styles.section} ${styles.about}`} id="apropos" data-revealed={shown(1)||undefined}><div className={styles.sectionInner}>
    <div className={`${styles.sectionHead} ${styles.reveal}`}>{label(1,t.about)}<span className={styles.rule}/></div>
    <div className={styles.aboutGrid}>
     <h2 className={styles.reveal} style={delay(0.08)}>{t.aboutLead}</h2>
     <div className={styles.aboutCopy}><p className={styles.reveal} style={delay(0.2)}>{t.aboutBody}</p><p className={styles.reveal} style={delay(0.3)}>{t.aboutBody2}</p></div>
    </div>
   </div></section>

   <section className={`${styles.section} ${styles.skills}`} id="competences" data-revealed={shown(2)||undefined}><div className={styles.sectionInner}>
    <div className={`${styles.sectionHead} ${styles.reveal}`}>{label(2,t.skills)}<span className={styles.rule}/></div>
    <div className={styles.skillsHead}><h2 className={styles.reveal} style={delay(0.08)}>{t.skills}</h2><p className={styles.reveal} style={delay(0.16)}>{t.skillsIntro}</p></div>
    <div className={styles.skillGroups}>{groups.map((group,i)=><div className={`${styles.skillRow} ${styles.reveal}`} style={delay(0.24+i*0.1)} key={i}><h3><span className={styles.rowIndex} aria-hidden="true">{index(i)}</span>{t.categories[i]}</h3><div className={styles.skillNames}>{group.map(s=><span key={s}>{s}</span>)}</div></div>)}</div>
   </div></section>

   <section className={`${styles.section} ${styles.contact}`} id="contact" data-revealed={shown(3)||undefined}><div className={styles.sectionInner}>
    <div className={`${styles.sectionHead} ${styles.reveal}`}>{label(3,t.contact)}<span className={styles.rule}/></div>
    <h2 className={styles.reveal} style={delay(0.08)}>{t.contactLead}</h2>
    <p className={styles.reveal} style={delay(0.18)}>{t.contactBody}</p>
    <a className={`${styles.email} ${styles.reveal}`} style={delay(0.28)} href="mailto:emma.dasilva.dev@gmail.com" aria-label={`${t.mail} : emma.dasilva.dev@gmail.com`}>emma.dasilva.dev@gmail.com <span aria-hidden="true">↗</span></a>
    <div className={`${styles.socials} ${styles.reveal}`} style={delay(0.36)}><a href="https://github.com/emma-dasilva-dev" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/emmadasilvadev" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
   </div></section>
  </main>
  <HalftoneFooter language={lang} />
  <footer className={styles.footer}>
   <span>© 2026 Emma DaSilva. {t.footer}</span>
   <span className={styles.credit}><a href="https://sketchfab.com/3d-models/headphones-b12a7fb702804cc19537047a033fe0d9" target="_blank" rel="noopener noreferrer">{t.credit}</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer license">CC BY 4.0</a></span>
   <a href="#accueil">↑ Back to top</a>
  </footer>
 </div>;
}
