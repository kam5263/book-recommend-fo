"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { QnaItem } from "@/lib/api/fetchQnaList";
import { fetchQnaList } from "@/lib/api/fetchQnaList";

export default function BookPreferenceQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qnaList, setQnaList] = useState<QnaItem[]>([]);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const current = qnaList[step];

  type Book = {
    title: string;
    author: string;
    description?: string;
    reason?: string;
  };

  useEffect(() => {
    const load = async () => {
      const qna = await fetchQnaList();
      setQnaList(qna);
    };
    load();
  }, []);

  if (qnaList.length === 0) return <div>로딩 중...</div>;

  const handleNext = async () => {
    if (step < qnaList.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      setLoading(true);
      try {
        // answers 객체를 배열로 변환
        const structuredAnswers = Object.entries(answers).map(([stepIndexStr, answer]) => {
          const stepIndex = parseInt(stepIndexStr);
          const questionId = qnaList[stepIndex].id;

          return {
            question_id: questionId,
            answer: answer
          };
        });
        
        const response = await fetch("http://127.0.0.1:8000/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: "user-" + Date.now(), answers: structuredAnswers })
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
    if (step > 0) setStep(step - 1);
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [step]: value });
  };

  const isAnswered = () => typeof answers[step] === "string" && answers[step] !== "";

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
              {book.reason && (
                <p className="text-sm mt-2 text-sky-600 italic">📌 추천 이유: {book.reason}</p>
              )}
            </div>
          ))}
        </div>

        {/* 선택지 해시태그 영역 */}
        <div className="mt-8 w-full max-w-3xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">✨ 내가 고른 선택지</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(answers).map(([stepIndexStr, answerValue], i) => {
              const stepIndex = parseInt(stepIndexStr);
              const optionLabel =
                qnaList[stepIndex].qna_option.find(opt => opt.value === answerValue)?.label || answerValue;

              return (
                <span
                  key={i}
                  className="bg-sky-100 text-sky-800 text-sm px-3 py-1 rounded-full border border-sky-300"
                >
                  #{optionLabel.startsWith("#") ? optionLabel.slice(1) : optionLabel}
                </span>
              );
            })}
          </div>
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

            <div className="space-y-2">
              {current.qna_option.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    id={`option-${i}`}
                    name={`question-${step}`}
                    value={option.value}
                    checked={answers[step] === option.value}
                    onChange={() => handleAnswer(option.value)}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`option-${i}`}
                    className="block cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium
                      hover:bg-sky-100 peer-checked:bg-sky-200 peer-checked:text-sky-900 peer-checked:border-sky-400
                      transition-all duration-150"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button onClick={handlePrev} disabled={step === 0 || submitted} variant="outline" className="w-full">
                이전
              </Button>
              <Button onClick={handleNext} disabled={!isAnswered() || submitted} className="w-full">
                {step < qnaList.length - 1 ? "다음" : "완료"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
