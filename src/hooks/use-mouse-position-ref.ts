import { useEffect, useRef } from "react";

export function useMousePositionRef(
    containerRef: React.RefObject<HTMLElement | null>
) {
    const positionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (x: number, y: number) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                positionRef.current = {
                    x: x - rect.left - rect.width / 2,
                    y: y - rect.top - rect.height / 2,
                };
            } else {
                positionRef.current = {
                    x: x - window.innerWidth / 2,
                    y: y - window.innerHeight / 2,
                };
            }
        };

        const handleMouseMove = (ev: MouseEvent) => {
            updatePosition(ev.clientX, ev.clientY);
        };

        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [containerRef]);

    return positionRef;
}
