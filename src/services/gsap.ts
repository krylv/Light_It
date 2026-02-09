import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);
export { gsap, ScrambleTextPlugin, SplitText };
