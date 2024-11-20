import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";

import React, { useState } from "react";
import { skills } from "../../groups/data";

export default function SkillsHover() {
  const [index, setIndex] = useState(0);
  useGSAP(() => {
    const items = Array.from(document.querySelectorAll(".hoverables li"));
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.2,
          color: "#1f939b",
          x: "100",
          duration: 0.2,
          ease: "power2.inOut",
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, color: "#2cd2dd", x: 0, duration: 0.3 });
      });
    });
    return () =>
      items.forEach((item) =>
        removeEventListener("mouseenter, mouseleave", () => {}),
      );
  });
  function handleHover(index) {
    setIndex(index);
  }
  return (
    <div className="my-36 grid h-screen w-full grid-cols-[1.5fr_1fr] px-10 text-white">
      <div className="col-span-1 flex w-full items-center">
        <ul className="hoverables flex list-none flex-col justify-center text-7xl font-bold text-[#2cd2dd]">
          {skills.map((skill, i) => {
            return (
              <li onMouseEnter={() => handleHover(i)} key={skill.id}>
                {skill.title}
              </li>
            ); // You need to return the <li> element
          })}
        </ul>
      </div>
      <div className="col-span-1 flex w-full items-center justify-center">
        <div className="flex h-[80%] w-[70%] flex-col items-center justify-center border-[1px] border-[#2cd2dd] py-8 text-[#2cd2dd]">
          <h3 className="mb-2 font-bold oldPhone:text-xl lg:text-4xl">
            {skills[index].title}
          </h3>
          <sub className="lg:text-md mb-11 text-gray-400 oldPhone:hidden oldPhone:text-justify android:block android:text-left android:text-sm android:tracking-tighter">
            {skills[index].subTitle}
          </sub>
          <span className="mb-12 block oldPhone:text-4xl android:text-6xl sm:text-7xl">
            <ion-icon name={skills[index].icon}></ion-icon>
          </span>

          <ul className="flex list-none flex-col gap-3">
            {skills[index].qualities.map((q, index) => (
              <li
                key={index}
                className="flex gap-2 font-semibold oldPhone:text-[12px] android:text-sm lg:text-[15px]"
              >
                <span className="text-bold">
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}