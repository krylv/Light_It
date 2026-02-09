"use client";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import { gsap, SplitText } from "services/gsap";

const Copyright = () => {
	const [fontsReady, setFontsReady] = useState(false);

	useEffect(() => {
		document.fonts.ready.then(() => {
			setFontsReady(true);
		});
	}, []);
	useGSAP(
		() => {
			if (!fontsReady) return;
			const split = SplitText.create(".copyrights", {
				type: "chars",
			});
			gsap.to(split.chars, {
				duration: 0.5,
				color: (idx) => `#${800000 * (idx + 1)}`,
				stagger: {
					each: 0.1,
					repeat: -1,
					yoyo: true,
				},
				y: -5,
				ease: "power1.inOut",
			});
		},
		{ dependencies: [fontsReady] },
	);
	return (
		<div className="copyrights fixed top-3 left-3 z-1 text-white">xkrlv</div>
	);
};

export default Copyright;
