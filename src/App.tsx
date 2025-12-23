"use strict";
// import { useState, useEffect, useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from "gsap/ScrollSmoother";

import "./App.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 0.5,
      smoothTouch: 0,
      effects: true,
    });

    var scrollMoreTL = gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: 250,
        scrub: true,
      }
    });

    scrollMoreTL.to(".scrollMore", {
      bottom: 75,
      opacity: 0,
      display: "none"
    });

    // make noise noisy
    gsap.to("#seed", {
      repeat: -1,
      repeatDelay: 0.25,
      duration: 0,
      ease: "none",
      onRepeat: () => {
        gsap.to("#seed", {
          attr: { seed: Math.floor(Math.random() * 1000) },
          duration: 0,
          ease: "none"
        });
      }
    });

    let mm = gsap.matchMedia();

    mm.add("(max-width: 1023px", () => {
      // set init
      gsap.set(".innerImage", {
        clearProps: "all",
      });

      var bgtl = gsap.timeline({
        scrollTrigger: {
          start: 0,
          endTrigger: "#text",
          end: "bottom bottom",
          scrub: true,
        }
      });

      bgtl.from("body", {
        background: "#fffee6",
        duration: 0.2,
      }, 0);

      bgtl.from("#nameMobile", {
        background: "#fffee6",
        duration: 0.2,
      }, 0);

      bgtl.to({}, { duration: 0 }, 1);

      var htl = gsap.timeline({
        scrollTrigger: {
          trigger: "#nameMobile",
          start: "top top",
          endTrigger: "#text",
          end: "bottom bottom",
          scrub: true,
          pin: "#nameMobile",
          pinSpacing: false,
        }
      });

      htl.set("#nameMobile", {
        height: "auto",
      });

      htl.to("#nameMobile", {
        // padding: "0.5rem",
        boxShadow: "var(--shadow-md)",
        fontSize: "1rem",
        fontWeight: "normal",
        textAlign: "left",
        padding: "0.5rem",
        duration: 0.1,
      }, 0);
      htl.to({}, { duration: 0 }, 1);
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.set(".innerImage", {
        // clearProps: "all", // Remove all GSAP inline styles first
        xPercent: 0,
        yPercent: -50,
        left: "50%",
        top: "50%",
        scale: 0.95
      });
      gsap.set("#name", { opacity: 1, display: "grid" });

      var tl = gsap.timeline({
        scrollTrigger: {
          start: 0,
          endTrigger: "#text",
          end: "bottom bottom",
          scrub: 0.4,

          pin: ".image",
          pinSpacing: false,

          onEnter: () => {
            gsap.set(".innerImage", { zIndex: 50 });
          },
        }
      });

      tl.set(".innerImage", {
        xPercent: 50,
        scale: 0.95,
      });

      tl.from("body", {
        background: "#fffee6",
        duration: 0.2,
      }, 0);
      tl.to("#name", {
        opacity: 0,
        display: "none",
        duration: 0.2,
      }, 0.1);
      tl.to(".innerImage", {
        xPercent: -50,
        scale: 0.95,
        duration: 0.5,
      }, 0);
      tl.from(".prose", {
        opacity: 0,
        duration: 0.4
      }, 0.1)
      tl.to({}, { duration: 0 }, 1);
    });
  }, { dependencies: [] });

  return (
    <>
      <div id="name" className="not-lg:hidden fixed w-full h-full grid grid-cols-2">
        <div className="col-span-1 flex items-center justify-center">
          <h1 className="w-min text-5xl font-bold">Sarah Engle Counseling</h1>
        </div>
      </div>
      <div className="bg">
        <svg>
          <defs>
            <filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
              <feTurbulence id="seed" type="turbulence" baseFrequency="0.183" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
              <feSpecularLighting surfaceScale="7" specularConstant="1.7" specularExponent="20" lightingColor="#7957A8" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
                <feDistantLight azimuth="3" elevation="66"></feDistantLight>
              </feSpecularLighting>
              <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="specularLighting" result="colormatrix"></feColorMatrix>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.45" /> {/* opacity */}
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
      </div>
      <div id="smooth-wrapper">
        <div className="flex flex-col" id="smooth-content">
          <div className="image h-dvh w-full pointer-events-none relative z-40">
            <img src="/sarah.png" alt="Sarah Engle" className="innerImage not-lg:w-full customH not-lg:object-contain rounded h-full absolute pointer-events-auto" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", aspectRatio: 618 / 870 }} />
            <h1 id="nameMobile" className="lg:hidden defaultBg absolute bottom-0 p-4 pb-6 w-full text-center text-4xl font-semibold">Sarah Engle Counseling</h1>
          </div>
          <div id="text" className="w-full flex flex-col items-center mt-8 p-8 lg:grid lg:grid-cols-2 relative z-0">
            <article className="prose text-justify indent-8 prose-headings:indent-0 lg:col-start-2 lg:pl-4">
              <h3 id="about">About me:</h3>
              <p>I graduated from University of Missouri - St. Louis in May of 2024 with my Master of Education in Clinical Mental Health Counseling degree, as well as a certificate in Social Justice & Multicultural Counseling. I have been working at Sonder Counseling since October of 2024. During my time at Sonder Counseling, I have worked with both individuals and couples. In addition to working at Sonder, I also work at CHADS Coalition for Mental Health, doing school-based counseling with middle schoolers and high schoolers. In my free time, I enjoy reading novels and poetry, writing poetry, walking or jogging outside, and cuddling with my cat. I am being supervised for my license by Jackie DeWald. My license number is: 2024046022</p>
              <hr />
              <h3>About my practice as a counselor:</h3>
              <p>Charles Bukowski poses the following question in his novel, Post Office:</p><blockquote>"Who were you, before the world told you who you should be?"</blockquote> <p>In my work as a counselor, my goal is to help each of my clients answer this question. The process of figuring out who we are underneath the masks which the people around us ask us to wear is often a painful, arduous process. However, as a counselor, I am with my clients every step of the way through this process. Together, my clients and I are like fellow archeologists, sifting through the dirt that society layers on top of each of us, so that we can uncover the gems hidden underneath; gems that show my clients who they truly are and what they truly need in their relationships. I focus a lot on relationships with my clients, as I believe that our relationships (which includes the society we live in) is the soil from which our thoughts and feelings grow. In relationship work with my clients, I focus on the following: helping my clients identify and clarify their personal values, boundary-setting, and communication skills.</p>
              <p>The theory behind my practice is strongly influenced by person-centered therapy, and relational therapies such as Relational-Cultural Therapy. However, I also lean heavily on behavior therapies such as Acceptance and Commitment Therapy and Radically Open Dialectical Behavior Therapy. I have experience working in grief and bereavement, with clients who have experienced traumatic loss, as well as with clients who are living with anxiety, depression, and/or personality disorders. I am open to working with individuals, as well as with partners. I am familiar with and knowledgeable about polyamory, and am comfortable working with multiple partners together in one session. I proudly identify as part of the LGBTQIA+ community and am passionate about working with clients who also identify as being a part of that community. In addition, my practice as a counselor is sex-positive, and weight-inclusive.</p>
            </article>
          </div>
        </div>
      </div>
      <div className="not-lg:hidden fixed left-0 right-0 w-full flex justify-center bottom-3 scrollMore">
        <span className="not-lg:hidden bg-[#fffdff5c] p-2 rounded backdrop-blur-sm backdrop-brightness-200">Scroll for more</span>
      </div>
    </>
  )
}

export default App
