import Copyright from "components/Copyright";
import Header from "components/Header";
import Lantern from "components/Lantern";
import RadialCircle from "components/RadialCircle";
import Wrapper from "components/Wrapper";
import { useState } from "react";

//Решение так себе для сложных app, но как тестовый вариант гуд
function App() {
	const [lightIsOn, setLightIsOn] = useState(false);
	return (
		<>
			<Copyright />
			<Wrapper isOn={lightIsOn}>
				<Header isOn={lightIsOn} />
				<Lantern isOn={lightIsOn} setIsOn={setLightIsOn} />
				<RadialCircle />
			</Wrapper>
		</>
	);
}

export default App;
