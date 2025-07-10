"use client";
import React, { useEffect, useState } from "react";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, Loader, WebcamIcon, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamShow, setWebCam] = useState(false);
  const [interviewID, setInterviewId] = useState(null);

  useEffect(() => {
    if (params?.interviewId) {
      setInterviewId(params.interviewId);
      fetchInterviewDetails(params.interviewId); // Use params.interviewId directly
    } else {
      console.log("No interview ID found in params.");
    }
  }, [params]);

  const fetchInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockID, interviewId));

      console.log("Interview Details:", result);
      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        console.warn("No interview data found for the provided ID.");
      }
    } catch (error) {
      console.log("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center bg-white text-gray-900">
      <h1 className="font-extrabold text-4xl mb-6 text-center text-indigo-600">
        🚀 Mock Interview Practice
      </h1>
      <p className="text-gray-600 mb-10 text-center text-lg">
        Practice answering real interview questions and get valuable feedback to excel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-6xl">
        {/* Webcam Section */}
        <div className="flex flex-col items-center">
          {webCamShow ? (
            <Webcam
              onUserMedia={() => console.log("Webcam enabled.")}
              onUserMediaError={(error) => {
                console.log("Webcam error:", error);
                setWebCam(false);
              }}
              mirrored={true}
              style={{
                height: 450, // Increased height
                width: 450,  // Increased width
                borderRadius: "20px",
              }}
              className="border-4 border-gray-300 shadow-lg"
            />
          ) : (
            <>
              <WebcamIcon className="h-80 w-full my-7 bg-gray-100 p-12 rounded-lg border border-gray-300 shadow-md" />
              <Button
                onClick={() => setWebCam(true)}
                className="font-semibold text-indigo-600"
                variant="ghost"
              >
                Enable Webcam & Microphone
              </Button>
            </>
          )}
        </div>

        {/* Job Information Section */}
        {interviewData ? (
          <div className="bg-white p-10 rounded-lg text-gray-800 w-full max-w-3xl mx-auto">

            <div className="flex flex-col gap-6">
              <p className="text-gray-800 text-lg font-semibold">
                <strong className="text-indigo-600">Job Position/Role:</strong>{" "}
                {interviewData.jobPosition || "Not Available"}
              </p>
              <p className="text-gray-800 text-lg font-semibold">
                <strong className="text-indigo-600">Job Description/Tech Stack:</strong>{" "}
                {interviewData.jobDescription || "Not Available"}
              </p>
              <p className="text-gray-800 text-lg font-semibold">
                <strong className="text-indigo-600">Experience Required:</strong>{" "}
                {interviewData.jobExperience || "Not Available"}
              </p>
            </div>
          </div>
        ) : (
          <h3 className="flex justify-center items-center font-bold text-lg text-indigo-500">
            <Loader className="animate-spin mr-2" /> Loading interview details...
          </h3>
        )}

      </div>

      {/* Start Interview Button */}
      <div className="flex justify-end">
        {interviewID ? (
          <Link href={`/dashboard/interview/${interviewID}/start`} passHref>
            <Button className="p-6 mx-4 border rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-bold">
              Start Interview
            </Button>
          </Link>
        ) : (
          <Button disabled className="p-6 mx-4 border rounded-xl bg-gray-400 text-white">
            Start Interview
          </Button>
        )}
      </div>

      {/* Additional Information Sections */}
      <div className="flex gap-6 mt-6">
        {/* Information Section */}
        <div className="mt-10 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md w-full max-w-3xl">
          <div className="flex items-center gap-4">
            <Lightbulb className="text-blue-500" size={32} />
            <h2 className="text-blue-800 font-bold text-lg">Important Information</h2>
          </div>
          <p className="text-blue-700 mt-4 leading-relaxed">
            - You will be asked <strong>5 interview questions</strong>.<br />
            - Ensure your Webcam and Microphone are enabled before starting.<br />
            - Answer each question and get feedback instantly to improve.<br />
            - Retry as many times as you'd like to perfect your answers.<br />
            <strong className="text-blue-800">Good Luck! You can do this! 💪</strong>
          </p>
        </div>

        {/* Motivational Section */}
        <div className="mt-10 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md w-full max-w-3xl">
          <div className="flex items-center gap-4">
            <Smile className="text-green-500" size={32} />
            <h2 className="text-green-800 font-bold text-lg">Stay Motivated</h2>
          </div>
          <p className="text-green-700 mt-4 leading-relaxed">
            "Success is not final, failure is not fatal: It is the courage to continue that counts."
            <br />
            Every attempt you make sharpens your skills. Keep going—you’re doing great! 🌟
          </p>
        </div>
      </div>
    </div>
  );
}

export default Interview;
