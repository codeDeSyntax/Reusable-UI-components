import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Link } from "react-scroll";
import Sociallinks from "./Sociallinks";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [divPosition, setDivPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, divPosition.height], [-10, 10]);
  const rotateY = useTransform(x, [0, divPosition.width], [-10, 10]);

  const handleMouseMove = (event) => {
    if (!isHovered) return;
    const { clientX, clientY } = event;
    const { top, left, width, height } = divPosition;
    const newX = clientX - left - width / 2;
    const newY = clientY - top - height / 2;
    animate(x, newX, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, newY, { type: "spring", stiffness: 300, damping: 20 });
  };

  const handleMouseEnter = (event) => {
    const { top, left, width, height } =
      event.currentTarget.getBoundingClientRect();
    setDivPosition({ top, left, width, height });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0 },
  };

  const imageItem = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[black] via-dark md:via-[black] to-dark md:to-dark  text-white pt-20 md:pt-24 lg:pt-28"
      name="Home"
    >
      <header className="fixed top-0 w-full p-6 bg-[black] z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-signature text-head ml-2">Josiah-Ok</h1>
          <nav className="hidden lg:flex space-x-6 text-text">
            <Link
              smooth
              duration={500}
              className="hover:cursor-pointer"
              to="Home"
            >
              Home
            </Link>
            <Link
              smooth
              duration={500}
              className="hover:cursor-pointer"
              to="About"
            >
              About
            </Link>
            <Link
              smooth
              duration={500}
              className="hover:cursor-pointer"
              to="Experience"
            >
              Experience
            </Link>
            <Link
              smooth
              duration={500}
              className="hover:cursor-pointer"
              to="Portfolio"
            >
              Projects
            </Link>
            <Link
              smooth
              duration={500}
              className="hover:cursor-pointer"
              to="Contact"
            >
              Contact
            </Link>
          </nav>
          <button
            className="text-2xl lg:hidden text-head"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>
        <Sociallinks />
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full  bg-gradient-to-b from-dark via-[black] to-[black] p-6 z-50 lg:hidden"
          >
            <button
              className="text-2xl text-head font-bold mb-6"
              onClick={toggleSidebar}
            >
              ✕
            </button>
            <ul className="space-y-4 text-text flex flex-col gap-4">
              <Link
                smooth
                duration={500}
                className="hover:cursor-pointer"
                to="Home"
                onClick={toggleSidebar}
              >
                Home
              </Link>
              <Link
                smooth
                duration={500}
                className="hover:cursor-pointer"
                onClick={toggleSidebar}
                to="About"
              >
                About
              </Link>
              <Link
                smooth
                duration={500}
                className="hover:cursor-pointer"
                onClick={toggleSidebar}
                to="Experience"
              >
                Experience
              </Link>
              <Link
                smooth
                duration={500}
                className="hover:cursor-pointer"
                onClick={toggleSidebar}
                to="Portfolio"
              >
                Projects
              </Link>
              <Link
                smooth
                duration={500}
                className="hover:cursor-pointer"
                onClick={toggleSidebar}
                to="Contact"
              >
                Contact
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-full mx-auto flex flex-col lg:flex-row items-center py-10 px-6 space-y-10 lg:space-y-0 lg:space-x-10 justify-around mt-12 md:mt-0"
        variants={container}
      >
        <motion.div
          className="space-y-4 text-left flex justify-center flex-col text-head"
          variants={item}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-left ">
            Im a digital designer
          </h1>
          <h2 className="text-4xl md:text-5xl font-extrabold">Julian Mack</h2>
          <div className="space-y-2 text-sm md:text-base">
            <p>Address: Rosia Road 55, Gibraltar, UK</p>
            <p>E-mail: julian.mack@company.com</p>
            <p>Phone: +13 5266 22 345</p>
          </div>
          <button className="px-6 py-2 bg-dark text-head rounded-full">
            Download CV ↓
          </button>
        </motion.div>

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
          }}
          className="group flex items-center justify-center border border-primary py-[3rem] rounded-lg bg-gradient-to-b from-[black] via-[black] to-dark"
          variants={imageItem}
          draggable="true"
        >
          <img
            src="/Josiah.png"
            alt="Julian Mack"
            className="rounded-full  shadow-sm shadow-head duration-500 md:h-[23rem] md:w-[23rem]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
