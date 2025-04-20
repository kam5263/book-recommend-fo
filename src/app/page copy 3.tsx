"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const questions = [
  {
    question: "요즘 어떤 감정을 느끼고 싶나요?",
    options: ["위로받고 싶다", "웃고 싶다", "몰입하고 싶다", "새로운 시선을 얻고 싶다", "현실을 잊고 판타지에 빠지고 싶다"]
  },
  {
    question: "어떤 소재나 주제에 관심이 있나요? (최대 3개)",
    options: ["가족", "사랑", "우정", "철학", "심리", "사회 문제", "미래/기술", "역사"]
  },
  {
    question: "최근 감명 깊게 본 영화/드라마/책은? (자유입력)",
    type: "text"
  },
  {
    question: "어떤 분위기의 책을 원하나요? (최대 3개)",
    options: ["잔잔하고 따뜻한", "자극적이고 강렬한", "지적이고 도전적인", "서정적이고 감성적인", "비틀린 유머가 있는"]
  },
  {
    question: "주로 언제 책을 읽으시나요? (최대 3개)",
    options: ["자기 전", "출퇴근길", "집중 가능한 시간에", "아무 때나 가볍게"]
  },
  {
    question: "선호하는 장르가 있다면? (최대 3개)",
    options: ["로맨스", "추리", "SF", "에세이", "자기계발", "인문학", "경제/경영", "심리학"]
  }
];

export default function BookPreferenceQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  type Book = {
    title: string;
    author: string;
    description?: string;
  };
  
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  

  const current = questions[step];

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      setLoading(true);

      try {
        const response = await fetch("http://127.0.0.1:8000/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: "user-" + Date.now(),
            answers: answers,
          }),
        });

        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error("추천 API 호출 실패:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswer = (value: string | string[]) => {
    setAnswers({ ...answers, [step]: value });
  };

  const isAnswered = () => {
    const a = answers[step];
    if (current.type === "text") return true;
    if (Array.isArray(a)) return a.length > 0;
    return typeof a === "string" && a !== "";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
        <p className="mt-4 text-gray-600">추천 도서를 불러오고 있어요...</p>
      </div>
    );
  }

  if (submitted && recommendations.length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">📚 당신을 위한 추천 도서</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
          {recommendations.map((book, index) => (
            <div key={index} className="bg-white shadow rounded-xl p-6 border">
              <h3 className="text-lg font-semibold text-sky-800">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              {book.description && <p className="text-sm mt-2 text-gray-700">{book.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

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
              <div className="space-y-2">
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
                        hover:bg-sky-100 peer-checked:bg-sky-200 peer-checked:text-sky-900 peer-checked:border-sky-400
                        transition-all duration-150"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {current.options?.map((option, i) => {
                  const selected = (answers[step] as string[]) || [];
                  const isSelected = selected.includes(option);
                  const canSelectMore = selected.length < 3 || isSelected;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (!canSelectMore) return;
                        const updated = isSelected
                          ? selected.filter((v) => v !== option)
                          : [...selected, option];
                        handleAnswer(updated);
                      }}
                      className={`w-full text-left px-4 py-2 border rounded-xl transition
                        ${isSelected ? "bg-sky-200 text-sky-900 border-sky-400" : canSelectMore ? "bg-white hover:bg-sky-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button onClick={handlePrev} disabled={step === 0 || submitted} variant="outline" className="w-full">
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isAnswered() || submitted}
                className="w-full"
              >
                {step < questions.length - 1 ? "다음" : "완료"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}