"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

const Headphones = dynamic(() => import("@/components/Headphones"), { ssr: false });
type Lang = "fr" | "en";
const copy = {
 fr: {
  nav:["Accueil","À propos","Compétences","Contact"], eyebrow:"CYBERSÉCURITÉ  /  DÉVELOPPEMENT WEB",
  hello:"Bonjour, moi c’est", title:"Emma DaSilva.", tag:"Curieuse de nature. Technique par conviction.",
  intro:"Je m'intéresse à la cybersécurité et à la programmation. J'aime comprendre les problèmes, explorer leur logique et construire des solutions fiables.",
  discover:"Découvrir mon profil", reach:"Me contacter", location:"Cotonou, Bénin", drag:"Déplacez votre curseur pour explorer",
  about:"À propos", aboutLead:"Comprendre avant d’agir.", aboutBody:"Je suis Emma DaSilva, développeuse web junior avec un intérêt croissant pour la cybersécurité. Le développement m’a appris à construire des applications. Aujourd’hui, je m’intéresse aussi à la manière dont elles fonctionnent, communiquent et se protègent.", aboutBody2:"J’apprends par la pratique, avec une attention particulière à Linux, aux réseaux et à l’analyse technique. Mon objectif est de continuer à progresser et de construire une carrière dans la cybersécurité.",
  skills:"Compétences", skillsIntro:"Un socle technique que je développe et approfondis.", categories:["Programmation","Développement web","Sécurité & outils"],
  contact:"Contact", contactLead:"Parlons technique.", contactBody:"Je suis ouverte aux opportunités de stage, aux collaborations techniques et aux échanges autour de la cybersécurité et du développement.", mail:"M’envoyer un e-mail", footer:"Tous droits réservés.", loading:"Modèle 3D en préparation"
 },
 en: {
  nav:["Home","About","Skills","Contact"], eyebrow:"CYBERSECURITY  /  WEB DEVELOPMENT",
  hello:"Hi, I’m", title:"Emma DaSilva.", tag:"Curiosity first. Engineering always.",
  intro:"I'm interested in cybersecurity and programming. I enjoy understanding problems, exploring the logic behind them, and building reliable solutions.",
  discover:"About me", reach:"Get in touch", location:"Cotonou, Benin", drag:"Move your cursor to explore",
  about:"About", aboutLead:"Understand before you act.", aboutBody:"I'm Emma DaSilva, a junior web developer with a growing interest in cybersecurity. Development taught me how to build applications. Today, I'm also interested in how they work, communicate, and stay protected.", aboutBody2:"I learn through hands-on practice, with a particular focus on Linux, networking, and technical analysis. My goal is to keep developing my skills and build a career in cybersecurity.",
  skills:"Skills", skillsIntro:"A technical foundation I'm building on.", categories:["Programming","Web development","Security & tools"],
  contact:"Contact", contactLead:"Let's talk technology.", contactBody:"I'm open to internships, technical collaborations, and conversations about cybersecurity and development.", mail:"Send an email", footer:"All rights reserved.", loading:"3D model coming soon"
 }
};
const groups = [["Python","JavaScript","C"],["HTML","CSS","React","Node.js"],["Linux","Kali Linux","Bash","Git","GitHub"]];
export default function Page() {
 const [lang,setLang] = useState<Lang>("fr");
 const [menu,setMenu] = useState(false);
 const [model,setModel] = useState(false);
 const t=copy[lang];
 useEffect(()=>{document.documentElement.lang=lang;document.title=lang==="fr"?"Emma DaSilva | Cybersécurité & Développement Web":"Emma DaSilva | Cybersecurity & Web Development";},[lang]);
 useEffect(()=>{fetch("/models/headphones.glb",{method:"HEAD"}).then(r=>setModel(r.ok)).catch(()=>setModel(false));},[]);
 const ids=["accueil","apropos","competences","contact"];
 return <div className={styles.site}>
  <header className={styles.header}><div className={styles.headerInner}>
    <a className={styles.brand} href="#accueil" aria-label="Emma DaSilva — home">ED<span>.</span></a>
    <nav aria-label={lang==="fr"?"Navigation principale":"Main navigation"} className={menu?styles.navOpen:styles.nav}>
      {t.nav.map((label,i)=><a key={ids[i]} href={"#"+ids[i]} onClick={()=>setMenu(false)}>{label}</a>)}
    </nav>
    <div className={styles.controls}><div className={styles.lang} aria-label="Language / Langue"><button onClick={()=>setLang("fr")} className={lang==="fr"?styles.current:""} aria-pressed={lang==="fr"}>FR</button><span aria-hidden="true">/</span><button onClick={()=>setLang("en")} className={lang==="en"?styles.current:""} aria-pressed={lang==="en"}>EN</button></div><button className={styles.menu} onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?"Close menu":"Open menu"}>{menu?"×":"☰"}</button></div>
  </div></header>
  <main>
   <section className={styles.hero} id="accueil"><div className={styles.heroInner}><div className={styles.heroCopy}>
    <p className={styles.eyebrow}><span className={styles.dot}/>{t.eyebrow}</p><h1>{t.hello}<br/><strong>{t.title}</strong></h1>
    <p className={styles.tag}>{t.tag}</p><p className={styles.heroIntro}>{t.intro}</p>
    <div className={styles.actions}><a className={styles.primary} href="#apropos">{t.discover}<span aria-hidden="true">↗</span></a><a className={styles.secondary} href="#contact">{t.reach}<span aria-hidden="true">↗</span></a></div>
   </div><div className={styles.heroVisual}>{model?<Headphones/>:<div className={styles.modelFallback}><span className={styles.orbit} aria-hidden="true"/><span className={styles.fallbackLabel}>{t.loading}</span></div>}<span className={styles.modelCaption}>{model?t.drag:"3D / 01"}</span></div></div>
    <div className={styles.heroFoot}><span>{t.location}</span><span>SCROLL ↓</span></div>
   </section>
   <section className={styles.section} id="apropos"><div className={styles.sectionHead}><span className={styles.smallLabel}>{t.about}</span><span className={styles.rule}/></div><div className={styles.aboutGrid}><h2>{t.aboutLead}</h2><div className={styles.aboutCopy}><p>{t.aboutBody}</p><p>{t.aboutBody2}</p></div></div></section>
   <section className={styles.section} id="competences"><div className={styles.sectionHead}><span className={styles.smallLabel}>{t.skills}</span><span className={styles.rule}/></div><div className={styles.skillsHead}><h2>{t.skills}</h2><p>{t.skillsIntro}</p></div><div className={styles.skillGroups}>{groups.map((group,i)=><div className={styles.skillRow} key={i}><h3>{t.categories[i]}</h3><div className={styles.skillNames}>{group.map(s=><span key={s}>{s}</span>)}</div></div>)}</div></section>
   <section className={styles.contact} id="contact"><div className={styles.sectionHead}><span className={styles.smallLabel}>{t.contact}</span><span className={styles.rule}/></div><h2>{t.contactLead}</h2><p>{t.contactBody}</p><a className={styles.email} href="mailto:emma.dasilva.dev@gmail.com">emma.dasilva.dev@gmail.com <span>↗</span></a><div className={styles.socials}><a href="https://github.com/emma-dasilva-dev" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/emmadasilvadev" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></section>
  </main><footer className={styles.footer}><span>© 2026 Emma DaSilva. {t.footer}</span><a href="#accueil">↑ Back to top</a></footer>
 </div>;
}