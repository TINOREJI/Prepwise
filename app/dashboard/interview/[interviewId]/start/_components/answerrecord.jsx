"use client"
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, WebcamIcon } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { chatSession } from "@/utils/GeminiAI";
import { StopCircleIcon } from 'lucide-react';

function Answerrecord(mockInterviewQuestions,activeQuestion) {
  const questions = mockInterviewQuestions?.interviewQuestions || [];
  const [userAnswer, setUserAnswer] = useState('');
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))},[results])

  const saveUserAnswer = async() => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.length < 10) {
        toast('Answer is too Short Please Record Again!');
        return;
      }
      setUserAnswer('');
      const feedback="Question"+questions[activeQuestion]?.question+
      ', User Answer:'+userAnswer+'depending on question and user answer give us rating of user response and feedback for user for improvement in 3-5 lines in JSON format in 2 fields feedback and rating - 1-5';

      const resultAfterUSerAnswer=await chatSession.sendMessage(feedback);

      const data=(resultAfterUSerAnswer.response.text()).replace('```json', '')
      .replace('```', '');
      console.log(data);

      const JSONResp=JSON.parse(data);
    } else {
      startSpeechToText();
    }
  };

  const logRecordedText = () => {
    console.log('Recorded Text:', userAnswer);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <div className="border rounded-lg flex flex-col items-center justify-center bg-gray-50 shadow-lg p-8 h-[500px] w-full max-w-md">
        <Button 
          onClick={() => setIsWebcamEnabled(!isWebcamEnabled)} 
          className="font-semibold text-indigo-600 mb-6"
          variant="ghost"
        >
          {isWebcamEnabled ? 'Disable Webcam' : 'Enable Webcam'}
        </Button>
        {isWebcamEnabled ? (
          <Webcam 
            className="rounded-lg border-2 border-indigo-300 shadow-lg" 
            style={{ width: '100%', height: 400 }} 
          />
        ) : (
          <WebcamIcon 
            alt="Placeholder" 
            className="text-indigo-500" 
            style={{ width: 200, height: 200 }} 
          />
        )}
      </div>
      <Button 
        variant="outline" 
        className={`mt-8 font-bold text-indigo-600  hover:bg-indigo-50 flex items-center gap-2 ${
          isRecording ? 'border-red-500' : 'border-indigo-500'
        }`}
                onClick={saveUserAnswer}
      >
        {isRecording ? (
          <><StopCircleIcon className="text-red-500" /> <h3 className='text-red-500'>Stop Recording</h3></>
        ) : (
          <><Mic className="text-indigo-500" /> <h3 className="text-indigo-500">Start Recording</h3></>
        )}
      </Button>
      <Button 
        variant="solid" 
        className="mt-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
        onClick={()=>console.log(userAnswer)}
      >
        Display Recorded Text
      </Button>
    </div>
  );
}

export default Answerrecord;
