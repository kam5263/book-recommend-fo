"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

const questions = [
  {
    question: "요즘 어떤 감정을 느끼고 싶나요? (1개)",
    options: ["위로받고 싶다", "웃고 싶다", "몰입하고 싶다", "새로운 시선을 얻고 싶다", "현실을 잊고 판타지에 빠지고 싶다"]
  },
  {
    question: "어떤 소재나 주제에 관심이 있나요? (다중) ",
    options: ["가족", "사랑", "우정", "철학", "심리", "사회 문제", "미래/기술", "역사"]
  },
  {
    question: "최근 감명 깊게 본 영화/드라마/책은? (자유입력)",
    type: "text"
  },
  {
    question: "어떤 분위기의 책을 원하나요? (다중) ",
    options: ["잔잔하고 따뜻한", "자극적이고 강렬한", "지적이고 도전적인", "서정적이고 감성적인", "비틀린 유머가 있는"]
  },
  {
    question: "주로 언제 책을 읽으시나요? (다중) ",
    options: ["자기 전", "출퇴근길", "집중 가능한 시간에", "아무 때나 가볍게"]
  },
  {
    question: "선호하는 장르가 있다면? (다중) ",
    options: ["로맨스", "추리", "SF", "에세이", "자기계발", "인문학", "경제/경영", "심리학"]
  }
];

export default function BookPreferenceQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const current = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("📝 최종 답변:", answers);
      alert("테스트가 완료되었습니다. 결과는 콘솔에 저장되었습니다! 🎉");
    }
  };

  const handleAnswer = (value: string | string[]) => {
    setAnswers({ ...answers, [step]: value });
  };

  const isAnswered = () => {
    const a = answers[step];
    if (current.type === "text") return a && (a as string).trim().length > 0;
    if (Array.isArray(a)) return a.length > 0;
    return typeof a === "string" && a !== "";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full max-w-xl"
      >
        <Card className="p-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">
              Q{step + 1}. {current.question}
            </h2>

            {current.type === "text" ? (
              <input
                type="text"
                onChange={(e) => handleAnswer(e.target.value)}
                value={answers[step] || ""}
                className="w-full p-2 border rounded"
              />
            ) : step === 0 ? (
              <RadioGroup
                value={answers[step] as string}
                onValueChange={(val) => handleAnswer(val)}
                className="space-y-2"
              >
                {current.options?.map((option, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      id={`option-${i}`}
                      name={`question-${step}`}
                      value={option}
                      checked={answers[step] === option}
                      onChange={() => handleAnswer(option)}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`option-${i}`}
                      className="block cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium
                                hover:bg-gray-100 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600
                                transition-all duration-150"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>


            ) : (
              <div className="space-y-2">
                {current.options?.map((option, i) => {
                  const selected = answers[step] as string[] || [];
                  const isSelected = selected.includes(option);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const updated = isSelected
                          ? selected.filter((v) => v !== option)
                          : [...selected, option];
                        handleAnswer(updated);
                      }}
                      className={`w-full text-left px-4 py-2 border rounded-xl transition
                        ${isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-100"}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            <Button
              className="mt-6 w-full"
              onClick={handleNext}
              disabled={!isAnswered()}
            >
              {step < questions.length - 1 ? "다음" : "완료"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
