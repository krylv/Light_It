import Lamp from "assets/lamp.svg";
import Line from "assets/line.svg";
import {
	type Dispatch,
	type MouseEvent,
	type SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { checkSvgPosition } from "utils/helpers/checkSvgPosition";
import { gsap } from "../services/gsap";

type LanterProps = {
	isOn: boolean;
	setIsOn: Dispatch<SetStateAction<boolean>>;
};

const Lantern = ({ isOn, setIsOn }: LanterProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const lampRef = useRef<SVGSVGElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const initialState = useRef<{
		path: string;
		cx: number;
		cy: number;
	} | null>(null);

	const handleMouseDown = () => {
		const svg = svgRef.current;
		if (!svg) return;

		const path = svg.querySelector("path");
		const circle = svg.querySelector("circle");

		if (!path || !circle) return;

		if (!initialState.current) {
			initialState.current = {
				path: path.getAttribute("d") || "",
				cx: Number(circle.getAttribute("cx")),
				cy: Number(circle.getAttribute("cy")),
			};
		}

		setIsDragging(true);
	};

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			const svg = svgRef.current;
			if (!svg) return;

			const rect = svg.getBoundingClientRect();
			const path = svg.querySelector("path");
			const circle = svg.querySelector("circle");

			if (!path || !circle || !initialState.current || !isDragging) return;

			if (e.clientX - 20 < rect.left || rect.right - e.clientX < 10) {
				gsap.to(path, {
					duration: 0.3,
					attr: {
						d: initialState.current.path,
					},
					ease: "circ.inOut",
				});
				gsap.to(circle, {
					duration: 0.3,
					attr: {
						cx: initialState.current.cx,
						cy: initialState.current.cy,
					},
					ease: "circ.inOut",
				});
				setIsDragging(false);
				return;
			}

			if (checkSvgPosition(rect, e)) {
				gsap.to(path, {
					duration: 1,
					attr: {
						d: initialState.current.path,
					},
					ease: "elastic",
				});
				gsap.to(circle, {
					duration: 1,
					attr: {
						cx: initialState.current.cx,
						cy: initialState.current.cy,
					},
					ease: "elastic",
				});

				setIsDragging(false);
				setIsOn((prev) => !prev);
				return;
			}

			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const viewBoxWidth = 200;
			const viewBoxHeight = 300;
			const normalizedX = (x / rect.width) * viewBoxWidth;
			const normalizedY = (y / rect.height) * viewBoxHeight;

			const newPath = `M 100 0, Q ${(100 + normalizedX) / 2} ${(0 + normalizedY) / 2}, ${normalizedX} ${normalizedY}`;

			path.setAttribute("d", newPath);
			circle.setAttribute("cx", String(normalizedX));
			circle.setAttribute("cy", String(normalizedY));
		},
		[setIsOn, isDragging],
	);

	const handleMouseUp = () => {
		const svg = svgRef.current;
		if (!svg || !initialState.current) return;
		const path = svg.querySelector("path");
		const circle = svg.querySelector("circle");

		gsap.to(path, {
			duration: 0.3,
			attr: {
				d: initialState.current.path,
			},
			ease: "back.out",
		});
		gsap.to(circle, {
			duration: 0.3,
			attr: {
				cx: initialState.current.cx,
				cy: initialState.current.cy,
			},
			ease: "back.out",
		});

		setIsDragging(false);
	};

	useEffect(() => {
		if (isOn) {
			gsap.to(lampRef.current, {
				duration: 0.5,
				filter:
					"drop-shadow(0 0 10px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 100px rgba(255, 255, 0, 0.5))",
			});
		} else {
			gsap.to(lampRef.current, {
				duration: 0.5,
				filter:
					"drop-shadow(0 0 10px rgba(255, 255, 0, 0)) drop-shadow(0 0 100px rgba(255, 255, 0, 0))",
			});
		}
	}, [isOn]);

	return (
		<article className="relative w-full flex justify-center items-center">
			<Lamp
				ref={lampRef}
				className={`size-25 md:size-35 lg:size-45 relative z-1 pointer-events-none transition-colors  ${isOn ? "text-black" : "text-white delay-700"}`}
			/>
			<Line
				ref={svgRef}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseDown={handleMouseDown}
				id="test"
				className={`size-25 md:size-35 lg:size-45 absolute left-1/2 -translate-x-1/2 translate-y-20 md:translate-y-28 lg:translate-y-35 ${
					isDragging ? "cursor-grabbing" : "cursor-grab"
				}`}
			/>
		</article>
	);
};

export default Lantern;
