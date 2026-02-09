import { radial_cards } from "../mocks/radial_cards";

const RadialCircle = () => {
	//TODO:try stagger animation with infinity circle rotating
	return radial_cards.map((card) => (
		<div
			className={`absolute flex items-center flex-col -z-1 ${card.pos}`}
			key={card.id}
		>
			<img alt="stickman" className="size-20" src={card.image} />
			<p className="text-black text-sm  md:text-xl">{card.title}</p>
		</div>
	));
};

export default RadialCircle;
