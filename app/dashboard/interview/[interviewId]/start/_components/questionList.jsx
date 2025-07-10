import { Lightbulb } from "lucide-react";
import React from "react";

export default function QuestionList({ mockInterviewQuestions, activeQuestion }) {
  // Ensure mockInterviewQuestions has the interviewQuestions property as an array
  const questions = mockInterviewQuestions?.interviewQuestions || [];
  const activeQuestionText = questions[activeQuestion]?.question;

  return (
    <div className="border rounded-lg p-6 bg-white shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestion === index ? "bg-indigo-600 text-white font-semibold" : "bg-secondary"
              }`}
            >
              Question {index + 1}: {question.questionText}
            </h2>
          ))
        ) : (
          <p className="text-gray-500">No questions available.</p>
        )}
      </div>
      {/* Active Question Details */}
      <div className="mt-6 p-2 border-t">
        <h2 className="text-indigo-600 mt-2 font-semibold text-sm md:text-lg">{activeQuestionText}</h2>
        <div className="border rounded-lg p-5 bg-indigo-100 mt-8">
          <h2 className="flex gap-2 items-center text-indigo-700">
            <Lightbulb/>
          <strong>Note:</strong>
          </h2>
          <p className="text-indigo-700 mt-2 leading-relaxed">
            - You will be asked <strong>5 interview questions</strong>.<br />
            - Ensure your Webcam and Microphone are enabled before starting.<br />
            - Answer each question and get feedback instantly to improve.<br />
            - Retry as many times as you'd like to perfect your answers.<br />
            <strong className="text-indigo-800">Good Luck! You can do this! 💪</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
