import { useCallback, useEffect, useRef } from "react";
import { gsap } from "../services/gsap";

type HeaderProps = {
	isOn: boolean;
};

const Header = ({ isOn }: HeaderProps) => {
	const textNode = useRef<HTMLParagraphElement | null>(null);

	const changeText = useCallback(() => {
		return isOn
			? gsap.to(textNode.current, {
					duration: 1,
					scrambleText: "Found in light",
				})
			: gsap.to(textNode.current, {
					duration: 1,
					scrambleText: "Lost in darkness",
				});
	}, [isOn]);

	useEffect(() => {
		changeText();
	}, [changeText]);

	return (
		<div
			className={`h3-medium md:text-3xl! uppercase select-none transition-colors ease-in-out ${isOn ? "text-black" : "text-white"}`}
		>
			<p ref={textNode} />
		</div>
	);
};

export default Header;
