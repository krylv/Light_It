interface IRadialCard {
	id: number;
	title: string;
	pos: string;
	image: string;
}

export const radial_cards: IRadialCard[] = [
	{
		id: 1,
		title: "Never give up",
		pos: "top-[20%] left-[10%] md:left-auto lg:top-[15%]",
		image: "/stickman_1.svg",
	},
	{
		id: 2,
		title: "Believe in yourself",
		pos: "top-[20%] right-[10%] md:top-auto lg:right-1/6",
		image: "/stickman_2.svg",
	},
	{
		id: 3,
		title: "Stay strong",
		pos: "bottom-[20%] left-[10%] md:left-auto md:bottom-[15%] lg:bottom-[10%]",
		image: "/stickman_3.svg",
	},
	{
		id: 4,
		title: "Dream big",
		pos: "bottom-[20%] right-[10%] md:bottom-auto md:right-auto md:left-1/6",
		image: "/stickman_4.svg",
	},
];
