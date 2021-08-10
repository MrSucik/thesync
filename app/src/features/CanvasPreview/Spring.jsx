import { useState } from "react";

import { animated, useSpring } from "react-spring";


const long =
  "https://firebasestorage.googleapis.com/v0/b/thesync.appspot.com/o/bakalari%2Fsupl-Mon%20Jun%2007%202021%2010%3A00%3A00%20GMT%2B0000.png?alt=media&token=8ca3ab05-e918-472d-a255-1443a75f130b";

const Spring = () => {
  const [flip, setFlip] = useState(true);
  const props = useSpring({
    to: { y: 0 },
    from: { y: -500 },
    reset: true,
    reverse: flip,
    delay: 1000,
    onRest: () => setFlip(!flip),
    config: { duration: 15000, friction: 500, tension: 20 },
  });
  return (
    <animated.div style={props}>
      <img src={long} alt="" />
    </animated.div>
  );
};

export default Spring;
