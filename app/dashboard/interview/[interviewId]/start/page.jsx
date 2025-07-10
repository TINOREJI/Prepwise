"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionList from "./_components/questionList";
import Answerrecord from "./_components/answerrecord";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [interviewID, setInterviewId] = useState(null);
  const [activeQuestion,setActiveQuestion]=useState(0);
  useEffect(() => {
    const { interviewId } = params || {};
    if (interviewId) {
      setInterviewId(interviewId);
      fetchInterviewDetails(interviewId);
    } else {
      console.warn("No interview ID found in params.");
    }
  }, [params]);

  const fetchInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockID, interviewId));

      if (result?.length > 0) {
        const interview = result[0];
        setInterviewData(interview);

        try {
          const jsonResponse = JSON.parse(interview.jsonInterviewRespnse || "[]");
          setMockInterviewQuestions(jsonResponse);
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
        }
      } else {
        console.warn("No interview data found for the provided ID.");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 mt-6 md:mt-10">
      {/* Question Component */}
      <QuestionList mockInterviewQuestions={mockInterviewQuestions} activeQuestion={activeQuestion} />

      {/* Video and Audio Feed */}
      <div>
        <Answerrecord mockInterviewQuestions={mockInterviewQuestions} activeQuestion={activeQuestion}/>
      </div>
    </div>
  );
}

export default StartInterview;
