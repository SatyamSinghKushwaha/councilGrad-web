

import React, { useState, useEffect } from 'react';


const POOLS = [
'bg-gradient-to-br from-blue-400/20 via-purple-500/15 to-pink-500/10',
'bg-gradient-to-br from-red-400/25 via-orange-500/20 to-yellow-500/15',
'bg-gradient-to-br from-purple-400/20 to-blue-500/15',
'border-4 border-dashed border-blue-400/30',
'border-4 border-dashed border-red-400/30',
'bg-blue-500/40',
'bg-red-500/40',
'bg-purple-500/40',
'bg-orange-500/40'
];


const floatingElements = () => (
Array.from({ length: 16 }).map((_, i) => ({
id: i,
cls: POOLS[i % POOLS.length],
size: ['w-96 h-96','w-80 h-80','w-64 h-64','w-48 h-48','w-40 h-40'][i % 5],
shape: i % 4 === 0 ? 'rounded-[60%_40%_50%_50%/40%_50%_60%_50%]' : (i % 3 === 0 ? 'rounded-full' : 'rounded-lg'),
left: `${Math.random() * 90 + 5}%`,
top: `${Math.random() * 90 + 5}%`,
delay: `${Math.random() * 8}s`,
scale: Math.random() * 0.4 + 0.8,
anim: ['animate-float-slow','animate-float-delayed','animate-spin-slow','animate-pulse-glow'][i % 4]
}))
);


const UnifiedBackground = () => {
const [elements, setElements] = useState(floatingElements);


useEffect(() => {
const id = setInterval(() => setElements(floatingElements), 20000);
return () => clearInterval(id);
}, []);


return (
<div className="bg-unified">
{elements.map((el) => (
<div key={el.id} className={`abs ${el.anim}`} style={{ left: el.left, top: el.top, transform: `scale(${el.scale})`, animationDelay: el.delay }}>
<div className={`${el.size} ${el.cls} ${el.shape} transition-all duration-1000`} />
</div>
))}
</div>
);
};


export default UnifiedBackground;