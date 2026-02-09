import type { MouseEvent } from "react";

export const checkSvgPosition = (svg: DOMRect, e: MouseEvent) => {
	return svg.bottom - e.clientY < 20;
};
