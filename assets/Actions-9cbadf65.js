import{r as t,_ as r,j as e,S as l}from"./index-45a6233b.js";import{u as o}from"./useCountStore-eeabbf3e.js";const a=t.lazy(()=>r(()=>import("./Sync-08a0f2d6.js"),["./Sync-08a0f2d6.js","./index-45a6233b.js","./index-c65b2ce6.css","./useColorScheme-417e46ad.js"],import.meta.url)),m=t.lazy(()=>r(()=>import("./Unsync-bdfb4cb7.js"),["./Unsync-bdfb4cb7.js","./index-45a6233b.js","./index-c65b2ce6.css","./useColorScheme-417e46ad.js"],import.meta.url)),j=()=>{const{mode:s,increment:d,decrement:i,setMode:c}=o(n=>({mode:n.mode,increment:n.increment,decrement:n.decrement,setMode:n.setMode}));return e.jsxs("div",{className:"animate-in grid grid-cols-2 place-items-center md:flex md:flex-wrap md:items-center md:justify-center gap-4",children:[e.jsxs("button",{className:"btn w-40",onClick:d,children:[e.jsx("kbd",{className:"kbd w-6 h-6",children:"+"}),"Increment"]}),e.jsxs("button",{className:"btn w-40",onClick:i,children:[e.jsx("kbd",{className:"kbd w-6 h-6",children:"-"}),"Decrement"]}),e.jsxs("div",{className:"dropdown",children:[e.jsxs("label",{tabIndex:0,className:"btn m-1 w-40",children:[e.jsx("kbd",{className:"kbd w-6 h-6",children:e.jsx(t.Suspense,{fallback:e.jsx(l,{}),children:s==="Sync"?e.jsx(a,{}):e.jsx(m,{})})}),s]}),e.jsxs("ul",{tabIndex:0,className:"menu dropdown-content bg-base-100 shadow-lg rounded-box w-40",children:[e.jsx("li",{children:e.jsx("a",{onClick:()=>c("Sync"),children:"Sync"})}),e.jsx("li",{children:e.jsx("a",{onClick:()=>c("Not Sync"),children:"Not sync"})})]})]}),e.jsx("button",{className:"btn btn-outline w-40",onClick:()=>window.open(".","_blank"),children:"Open in new window"}),s==="Not Sync"&&e.jsx("div",{className:"toast",children:e.jsx("div",{className:"alert alert-info",children:e.jsx("span",{children:"This sync mode won't work in this example."})})})]})};export{j as default};