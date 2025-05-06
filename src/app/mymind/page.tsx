"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Heart, Leaf, Brain, Lightbulb, Sun, Sparkles, Moon, CloudRain } from "lucide-react";
import { WordCategory } from "@/types";
import { useRouter } from "next/navigation";
import FloatingHomeButton from "@/components/FloatingHomeButton";

interface WordItem {
  text: WordCategory;
  icon: React.ReactNode;
  color: string;
}

const icons = {
  힐링: <Leaf className="mr-2 h-5 w-5" />,
  도파민: <Brain className="mr-2 h-5 w-5" />,
  사랑: <Heart className="mr-2 h-5 w-5" />,
  동기부여: <Lightbulb className="mr-2 h-5 w-5" />,
  현실: <Sun className="mr-2 h-5 w-5" />,
  명상: <Sparkles className="mr-2 h-5 w-5" />,
  외로움: <Moon className="mr-2 h-5 w-5" />,
  슬픔: <CloudRain className="mr-2 h-5 w-5" />,
};

const words: WordItem[] = Object.keys(icons).map((key) => ({
  text: key as WordCategory,
  icon: icons[key as WordCategory],
  color: "bg-purple-100 text-purple-800 border-purple-300",
}));

function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    return hasMounted;
}  

export default function FloatingWords() {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="absolute top-10 left-0 right-0 text-center z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
          오늘의 책 추천
        </h1>
        <p className="text-lg text-gray-600">
          당신의 마음에 와닿는 단어를 선택하세요
        </p>
      </div>

      {words.map((word) => (
        <FloatingButton
          key={word.text}
          word={word}
          //delay={idx * 0.5}
          paused={hovered}
          onHoverChange={setHovered}
          onClick={() => {
            const encoded = encodeURIComponent(word.text); // ✅ 한글 대응
            router.push(`/mymind/result?word=${encoded}`);
          }}
        />
      ))}

    <FloatingHomeButton />
    </div>
  );
}

function FloatingButton({
  word,
  paused,
  onHoverChange,
  onClick,
}: {
  word: WordItem;
  //delay: number;
  paused: boolean;
  onHoverChange: (v: boolean) => void;
  onClick: () => void;
}) {
  const controls = useAnimation();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;

    let mounted = true;

    const moveRandomly = async () => {
        if (typeof window === "undefined" || paused || !mounted) return;
  
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const paddingX = 80;
        const paddingY = 80;
  
        const x = Math.random() * (vw - paddingX * 2) - (vw / 2 - paddingX);
        const y = Math.random() * (vh - paddingY * 2) - (vh / 2 - paddingY);
        const duration = 6 + Math.random() * 4;
  
        try {
          await controls.start({
            x,
            y,
            transition: { duration, ease: "easeInOut" },
          });
  
          if (mounted && !paused) {
            moveRandomly(); // 재귀 호출
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          // 에러 무시
        }
    };

    if (!paused) {
        moveRandomly();
    }
    else {
        controls.stop();
    }
    return () => {
        mounted = false; // 컴포넌트 언마운트되면 루프 중단
        controls.stop();
    };
  }, [paused, hasMounted]);

  return (
    <motion.button
      onClick={onClick}
      className="absolute py-3 px-5 rounded-full flex items-center shadow-lg border font-medium text-lg"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: paused ? 10 : 5,
      }}
      initial={{ x: 0, y: 0 }}
      animate={controls}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div className={`${word.color} flex items-center px-4 py-2 rounded-full border`}>
        {word.icon}
        {word.text}
      </div>
    </motion.button>
  );
}
