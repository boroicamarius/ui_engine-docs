"use client";

import Image from "next/image";
import styles from "./page.module.scss";

import { RiMenu4Line } from "react-icons/ri";
import { useEffect } from "react";

import hljs from 'highlight.js';

import 'highlight.js/styles/xcode.css';


function Docs(props) {
  const { children } = props;
  return (
    <div className={styles.docs} {...props}>
      {children}
    </div>
  );
}

function Img(props) {
  return (
    <div {...props}>
      <Image
        className={styles.img}
        src={props.src}
        width={0}
        height={0}
        layout="responsive"
      />
    </div>
  );
}

function Header(props) {
  return (
    <p className={styles.header} {...props}>
      <div className={styles.bagel}/>{props.children}
    </p>
  );
}

function SubHeader(props) {
  return (
    <p className={styles.sub_header} {...props}>
      <div className={styles.bagel}/>{props.children}
    </p>
  );
}

function Block(props) {

  let code_lines =  props.text.split("\n").map(txt => hljs.highlight(txt,{language: props.lang}).value)

  return (
    <pre className={styles.block}>
      {code_lines.map((line,idx)=>{
        return (<div className={styles.code} key={idx} dangerouslySetInnerHTML={{ __html: line }} />)})}
    </pre>
  );
}

export default function Home() {

  return (
    <main className={styles.main}>
      <Docs>
        <div className={styles.top_bar}>
          <h1>Documentație | UI_engine</h1>
          <RiMenu4Line className={styles.icon} style={{opacity:0}} />
        </div>
        <Img
          className={styles.logo}
          src="/logo.png"
          width={0}
          height={0}
          layout="responsive"
        />
        <Header>Începeți cu</Header>
        <Block
        lang="bash"
          text={
            "mkdir project\ncd project\ngit clone https://github.com/boroicamarius/UI_engine.git"
          }
        />

        <SubHeader>În folderul <span>'project/'</span> creați <span>'CMakeLists.txt'</span> și <span>'main.cpp'</span></SubHeader>

        <Block
        lang="cmake"
          text={`#CMakeLists.txt
cmake_minimum_required(VERSION 3.26)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED YES)
set(CMAKE_CXX_EXTENSIONS OFF)
            
project(app)
            
add_subdirectory(UI_engine)
            
add_executable(runnable main.cpp)
target_link_libraries(runnable PUBLIC UI_engine)`}
        />
        <Block
        lang="cpp"
          text={`//main.cpp
#include <UI_engine/UI_engine.h>

using namespace UI_engine;

int main(int argc, char* argv[]) {
  UI_window window("exampleWindow",
    SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
    400, 400, SDL_WINDOW_SHOWN, SDL_RENDERER_ACCELERATED,
    144.0);

  UI_frame frame_example(0.0f, 0.0f, 35.0f, 35.0f, 1.0f, { 0,0,0,255 });
  frame_example.filled();

  window.add(&frame_example);
  processEvents(&window);
  return 0;
}`}
        />
    <SubHeader>Și gata! Avem o aplicație ce folosește <span>UI_engine</span>.</SubHeader>

    <Header>Ce avem la dispoziție și ce ne oferă UI_engine?</Header>
    <SubHeader>Un sistem <span>simplu</span> și <span>rapid</span> pentru a folosi <span>interfețe grafice</span> în <span>C++</span></SubHeader>
    <SubHeader>Componente de bază: <span>UI</span>, <span>UI_window</span>, <span>UI_frame</span>, <span>UI_text</span>, <span>UI_image</span>, <span>UI_collection</span> care pot fii folosite pentru a creea elemente mult mai complexe.</SubHeader>
    <SubHeader>Și opportunitatea de a creea aplicații extrem de faine!</SubHeader>

    <Header>Documentația componentelor:</Header><br/>
    <Header>UI</Header><br/>
    <SubHeader>Codul sursă al elementului <span>UI</span></SubHeader>
    <Block lang="cpp"
    text={`#pragma once

#ifndef _UI
#define _UI

#include <SDL.h>
#include <functional>

class UI {
public:

  UI();
  ~UI();

  virtual float width();
  virtual void width(float w);

  virtual float height();
  virtual void height(float h);

  virtual float transparency();
  virtual void transparency(float t);

  virtual float x();
  virtual void x(float x);

  virtual float y();
  virtual void y(float y);

  virtual void show();
  virtual void hide();

  virtual void render();
  virtual void destroy();

  float getParentPosX();
  float getParentPosY();

  void toggleEvents();

protected:

  friend class UI_window;
  friend class UI_collection;

  virtual void execute_event(UI_window* _window,const SDL_Event& _event);

  void init();
  void finit();

  bool used = false;
  bool isVisible = true;
  bool getsEvents = false;
  SDL_FRect* interface;
  float transparencyVal = 0.0f;
  UI* parent = NULL;

public:

  struct UI_eventData {
    UI_window* w;
    const SDL_Event& e;
    UI* obj;
  };

  typedef std::function<void(UI_eventData)> UI_event;

  UI_event onMousePress;
  UI_event onMouseRelease;
  UI_event onMouseMove;
  UI_event onKeyPress;
  UI_event onKeyRelease;
  UI_event onScroll;

};

#endif`}/>

<SubHeader>Descrierea funcțiilor <span>PUBLICE</span> <br/>
-<span>width()</span> returnează lățimea elementului<br/>
-<span>width(float w)</span> setează lățimea elementului prin parametrul <span>w</span><br/>
-<span>height()</span> returnează înălțimea elementului<br/>
-<span>height(float h)</span> setează înălțimea elementului prin parametrul <span>h</span><br/>
-<span>transparency()</span> returnează opacitatea elementului<br/>
-<span>transparency(float t)</span> setează opacitatea elementului prin parametrul <span>t</span><br/>
-<span>x()</span> returnează poziția x a elementului<br/>
-<span>x(float x)</span> setează poziția x prin parametrul <span>x</span><br/>
-<span>y()</span> returnează poziția y a elementului<br/>
-<span>y(float y)</span> setează poziția y prin parametrul <span>y</span><br/>
-<span>show()</span> face elementul vizibil<br/>
-<span>hide()</span> face elementul invizibil<br/>
-<span>getParentPosX()</span> obține recursiv poziția x absolută a elementului față de fereastră<br/>
-<span>getParentPosY()</span> obține recursiv poziția y absolută a elementului față de fereastră<br/>
-<span>toggleEvents()</span> obține recursiv poziția y absolută a elementului față de fereastră<br/>
</SubHeader>

<SubHeader>Descrierea variabilelor <span>PUBLICE</span> <br/>
-<span>onMousePress și onMouseRelease</span> stochează o funcție dată de dezvoltator care să fie executată la fiecare apăsare/lăsare a mouseului<br/>
-<span>onMouseMove</span> stochează o funcție dată de dezvoltator care să fie executată la fiecare mișcare a mouseului<br/>
-<span>onKeyPress și onMouseRelease</span> stochează o funcție dată de dezvoltator care să fie executată la fiecare apăsare/lăsare a mouseului<br/>
</SubHeader>

      </Docs>
    </main>
  );
}
