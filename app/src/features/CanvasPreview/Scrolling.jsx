import { useState } from "react";
import { animated, useSpring, config } from "react-spring";

const long =
  "https://firebasestorage.googleapis.com/v0/b/thesync.appspot.com/o/bakalari%2Fsupl-Mon%20Jun%2007%202021%2010%3A00%3A00%20GMT%2B0000.png?alt=media&token=8ca3ab05-e918-472d-a255-1443a75f130b";

function Scrolling() {
  const [flip, set] = useState(false);

  const { scroll } = useSpring({
    scroll: 2856 - 1760,
    from: { scroll: 0 },
    reset: true,
    reverse: flip,
    delay: 1000,
    config: { ...config.slow, duration: 20000 },
    onRest: () => set(!flip),
  });

  return (
    <animated.div
      style={{
        position: "relative",
        width: "100%",
        height: 1760,
        overflow: "auto",
      }}
      scrollTop={scroll}>
      <img src={long} alt="" />
    </animated.div>
  );
}

export default Scrolling;
