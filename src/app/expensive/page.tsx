"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/api/api";
import FloatingHomeButton from "@/components/FloatingHomeButton";

interface Book {
    title: string;
    author?: string;
    itemPage?: number;
    cover?: string;
    priceStandard?: number;
    bestSellerRank: string;
    link?: string;
}

const ExpensiveBooksList: React.FC = () => {
    const [expensiveBooks, setExpensiveBooks] = useState<Book[]>([]);
    const [thickBooks, setThickBooks] = useState<Book[]>([]);
    const [selectedSort, setSelectedSort] = useState<"expensive" | "thick">("expensive");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const [expensiveRes, thickRes] = await Promise.all([
                    api.get("/expensive?limit=20"),
                    api.get("/thick?limit=20")
                ]);
                setExpensiveBooks(expensiveRes.data.results);
                setThickBooks(thickRes.data.results);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError("서버 오류: " + (err.response?.data?.message || err.message));
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const books = selectedSort === "expensive" ? expensiveBooks : thickBooks;

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold">📚 도서 목록 불러오는 중...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-20">{error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                💰 비싸고 두꺼운 책 TOP 20
            </h1>
            <div className="flex justify-center gap-4 mb-8">
                <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                        selectedSort === "expensive"
                            ? "bg-[color:#EFE8D8] text-[color:#FF4552] "
                            : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setSelectedSort("expensive")}
                >
                    비싼순
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                        selectedSort === "thick"
                            ? "bg-[color:#61BFAD] text-[color:#FFFFFF]"
                            : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setSelectedSort("thick")}
                >
                    두꺼운순
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book, idx) => (
                    <a
                        key={idx}
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex items-start gap-4"
                    >
                        <div className="flex-shrink-0">
                            <Image
                                src={book.cover || "/placeholder.jpg"}
                                alt={book.title}
                                width={80}
                                height={120}
                                className="object-cover rounded w-20 h-28"
                                unoptimized
                            />
                        </div>
                        <div className="flex flex-col flex-grow min-w-0">
                            <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
                                {book.title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-1 truncate">{book.author}</p>
                            {book.priceStandard && (
                                <p className={`text-sm font-bold mb-1 ${selectedSort === "expensive" ? "text-[color:#FF4552]" : "text-gray-600"}`}>
                                    💵 가격: {book.priceStandard.toLocaleString()}원
                                </p>
                            )}
                            <p className={`text-sm font-bold mb-1 ${selectedSort === "thick" ? "text-[color:#61BFAD]" : "text-gray-600"}`}>
                                📖 {book.itemPage}쪽
                            </p>
                            {book.bestSellerRank && (
                                <p className="text-xs text-gray-500 italic mt-1 truncate">{book.bestSellerRank}</p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
            <FloatingHomeButton />
        </div>
    );
};

export default ExpensiveBooksList;
