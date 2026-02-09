import { useGSAP } from "@gsap/react";
import { type PropsWithChildren, useRef } from "react";
import { gsap } from "services/gsap";

type WrapperProps = PropsWithChildren & { isOn: boolean };

const Wrapper = ({ children, isOn }: WrapperProps) => {
	const mainNode = useRef<HTMLElement | null>(null);

	const changeBackgroundRadial = () => {
		if (isOn) {
			gsap.to(mainNode.current, {
				duration: 1,
				backgroundImage:
					"radial-gradient(circle at center, transparent, #000000 80%)",
				backgroundColor: "transparent",
			});
		} else {
			gsap.to(mainNode.current, {
				duration: 1,
				backgroundImage: "radial-gradient(circle at center, white, #000000 0%)",
			});
		}
	};

	useGSAP(() => {
		changeBackgroundRadial();
	}, [isOn]);
	return (
		<section
			ref={mainNode}
			className="px-8 relative bg-black w-full  flex flex-col h-screen items-center  justify-center "
		>
			{children}
		</section>
	);
};

export default Wrapper;
