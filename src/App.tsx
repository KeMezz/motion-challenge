import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#fdcb6e, #e17055);
`;

const CenterBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 500px;
  background-color: #fff;
  z-index: 101;
  border-radius: 20px;
`;

const Overlay = styled(motion.section)`
  z-index: 100;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Boxes = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
`;

const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #fff;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
`;

const SwtichBtn = styled(motion.button)`
  text-transform: uppercase;
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: rgba(45, 52, 54, 1);
  font-weight: 900;
`;

const boxVariants: Variants = {
  initial: { scale: 1 },
  animate: { scale: 1.1, transition: { duration: 0.3 } },
};

const boxesArr = ["right bottom", "left bottom", "right top", "left top"];

function App() {
  const [switched, setSwitched] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  return (
    <>
      <AnimatePresence>
        {selectedId ? (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId("")}
          >
            <CenterBox layoutId={selectedId} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Container>
        <Boxes>
          {boxesArr.map((item, index) => (
            <Box
              onClick={() => setSelectedId(index + "")}
              layoutId={index + ""}
              key={index}
              variants={boxVariants}
              initial="initial"
              whileHover="animate"
              style={{ transformOrigin: item }}
            >
              {item === "left bottom" && !switched ? (
                <Circle layoutId="circle" />
              ) : null}
              {item === "right top" && switched ? (
                <Circle layoutId="circle" />
              ) : null}
            </Box>
          ))}
        </Boxes>
        <SwtichBtn
          initial={{ scale: 1 }}
          whileTap={{ scale: 1.1, color: "rgba(214, 48, 49, 1.0)" }}
          onMouseDown={() => setSwitched(true)}
          onClick={() => setSwitched(false)}
        >
          switch
        </SwtichBtn>
      </Container>
    </>
  );
}

export default App;
