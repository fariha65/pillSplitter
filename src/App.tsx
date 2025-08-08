import React, { useState, useRef } from 'react';

let id = 0; // Unique ID for each pill

const App = () => {
  const [pills, setPills] = useState([]); // pill gula er list
  const [cursor, setCursor] = useState({ x: 0, y: 0 }); // mouse er current position
  const containerRef = useRef(null); // container element er reference
  const dragRef = useRef(null); // drag er jonno temporary reference

  // Random color generate korar function
  const randomColor = () => `hsl(${Math.random() * 360}, 70%, 70%)`;

  // Mouse move korle cursor position update hoi + dragging hole pill move hoy
  const handleMouseMove = (e) => {
    const box = containerRef.current.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    setCursor({ x, y });

    if (dragRef.current) {
      const dx = x - dragRef.current.offsetX;
      const dy = y - dragRef.current.offsetY;
      setPills(prevPills => prevPills.map(p =>
        p.id === dragRef.current.id ? { ...p, x: dx, y: dy } : p
      ));
    }
  };

  // Mouse click kore drag er start position niye pill create korar process
  const handleMouseDown = (e) => {
    const box = containerRef.current.getBoundingClientRect();
    const startX = e.clientX - box.left;
    const startY = e.clientY - box.top;

    const handleMouseUp = (ev) => {
      const endX = ev.clientX - box.left;
      const endY = ev.clientY - box.top;
      const x = Math.min(startX, endX);
      const y = Math.min(startY, endY);
      const w = Math.max(40, Math.abs(endX - startX)); // minimum 40px
      const h = Math.max(40, Math.abs(endY - startY));

      setPills(prev => [...prev, { id: id++, x, y, w, h, color: randomColor() }]);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mouseup', handleMouseUp);
  };

  // Drag start korle kon pill k dhora hoise ta track kore
  const startDrag = (e, pill) => {
    e.stopPropagation(); // Parent event stop
    const box = containerRef.current.getBoundingClientRect();
    dragRef.current = {
      id: pill.id,
      offsetX: e.clientX - box.left - pill.x,
      offsetY: e.clientY - box.top - pill.y
    };
  };

  // Mouse chere dile drag bondho
  const stopDrag = () => {
    dragRef.current = null;
  };

  // Mouse click korar location er upor base kore pill 2 vag kore
  const splitPills = () => {
    const newPills = [];

    pills.forEach(p => {
      const cx = cursor.x;
      const cy = cursor.y;

      const insideX = cx > p.x && cx < p.x + p.w;
      const insideY = cy > p.y && cy < p.y + p.h;

      // vertical split
      if (insideX) {
        const left = cx - p.x;
        const right = p.w - left;
        if (left >= 20 && right >= 20) {
          newPills.push(
            { ...p, id: id++, w: left },
            { ...p, id: id++, x: cx, w: right }
          );
          return;
        }
      }

      // horizontal split
      if (insideY) {
        const top = cy - p.y;
        const bottom = p.h - top;
        if (top >= 20 && bottom >= 20) {
          newPills.push(
            { ...p, id: id++, h: top },
            { ...p, id: id++, y: cy, h: bottom }
          );
          return;
        }
      }

      newPills.push(p);
    });

    setPills(newPills);
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-blue-100 relative"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={stopDrag}
      onClick={splitPills} // click korle split hobe
    >
      {/* cursor er guide line (vertical and horizontal) */}
      <div className="absolute bg-black opacity-30" style={{ left: cursor.x, top: 0, width: 1, height: '100%' }} />
      <div className="absolute bg-black opacity-30" style={{ top: cursor.y, left: 0, height: 1, width: '100%' }} />

      {/* pill render kortese */}
      {pills.map(p => (
        <div
          key={p.id}
          className="absolute border border-black rounded-[20px]"
          onMouseDown={(e) => startDrag(e, p)}
          style={{
            left: p.x,
            top: p.y,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};

export default App;