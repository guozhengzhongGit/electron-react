import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Menu from './components/Menu';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const toggleTheme = (event) => {
    console.log(event)
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    let isDark;

    const transition = document.startViewTransition(() => {
        const root = document.documentElement;
        isDark = root.classList.contains("dark");
        root.classList.remove(isDark ? "dark" : "light");
        root.classList.add(isDark ? "light" : "dark");
      });
      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: isDark ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 500,
            easing: "ease-in",
            pseudoElement: isDark
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          }
        );
      });
  }
  return (
    <BrowserRouter >
    <div className="app">
        <div className='left-bar'>
            <button onClick={toggleTheme}>切换主题</button>
        </div>
        <div className='right-content'>
        <Menu />
           <Routes>
           <Route element={<HomePage />}
                  path="/"
                  exact
              ></Route>
              <Route element={<HomePage />}
                  path="/info"
              ></Route>
              {/* <Route element={<List/>}
                  path="/list"
              ></Route>
              <Route element={<Layout/>}
                  path="/children"
              >
                  <Route element={<Child1/>}
                      path="/children/child1"
                  ></Route>
                  <Route element={<Child2/>}
                      path="/children/child2"
                  ></Route>
              </Route> */}
           </Routes>
        </div>
    </div>
    </BrowserRouter>
  )
}

export default App
