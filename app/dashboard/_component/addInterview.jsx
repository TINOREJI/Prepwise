"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { chatSession } from "@/utils/GeminiAI";
import { Loader } from "lucide-react";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { MockInterview } from "@/utils/schema";
import { useRouter } from "next/navigation";

function AddInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setjobPosition] = useState();
  const [jobDescription, setjobDescription] = useState();
  const [jobExperience, setjobExperience] = useState();
  const [loadingBar, setLoadingBar] = useState(false);
  const [jSONResponse, setjsonResponse] = useState([]);
  const { user } = useUser();
  const route = useRouter();

  const onSubmit = async (e) => {
    setLoadingBar(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExperience);

    const InputQuestions = 
      "Job Position:" + jobPosition + 
      " Job Description: " + jobDescription + 
      " Job Experience: " + jobExperience + 
      " based on these make " + process.env.NEXT_PUBLIC_INPUT_QUESTION_NUM + 
      " questions and answer for my interview in JSON format.";

    const responsefromAI = await chatSession.sendMessage(InputQuestions);
    const JSONResponse = responsefromAI.response.text()
      .replace('```json', '')
      .replace('```', '');

    console.log(JSON.parse(JSONResponse));
    setjsonResponse(JSONResponse);

    if (JSONResponse) {
      const resp = await db.insert(MockInterview).values({
        mockID: uuidv4(),
        jsonInterviewRespnse: JSONResponse,
        jobPosition: jobPosition,
        jobDescription: jobDescription,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress || 'Anonymous',
        createdAt: moment().format('DD-MM-yyyy')
      }).returning({ mockID: MockInterview.mockID });

      console.log("Inserted ID:", resp);

      if (resp) {
        setOpenDialog(false);
        route.push('/dashboard/interview/' + resp[0]?.mockID);
      }
    } else {
      console.log("Error");
    }
    setLoadingBar(false);
  };

  return (
    <div>
      {/* Add New Button */}
      <div
        className="p-6 rounded-xl bg-gradient-to-r from-[#a900e1] to-[#a900e2] hover:scale-105 hover:shadow-lg cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center text-white">+ Add New</h2>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-800">Tell us more about yourself.</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <h3 className="text-gray-800">Add details about your job position, job description, and years of experience.</h3>

                  {/* Job Position Input */}
                  <div className="space-y-2">
                    <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
                      Job Position/Job Role
                    </label>
                    <Input
                      id="jobPosition"
                      placeholder="Ex. Data Scientist"
                      required
                      onChange={(event) => setjobPosition(event.target.value)}
                      className="border-gray-300 focus:ring-blue-500"
                    />
                  </div>

                  {/* Job Description Input */}
                  <div className="space-y-2">
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                      Job Description
                    </label>
                    <textarea
                      id="jobDescription"
                      placeholder="Describe your responsibilities and achievements..."
                      className="w-full p-3 border rounded-md text-gray-700 border-gray-300 focus:ring-blue-500"
                      required
                      onChange={(event) => setjobDescription(event.target.value)}
                    />
                  </div>

                  {/* Job Experience Input */}
                  <div className="space-y-2">
                    <label htmlFor="jobExperience" className="block text-sm font-medium text-gray-700">
                      Job Experience
                    </label>
                    <input
                      id="jobExperience"
                      placeholder="Ex. 3"
                      className="w-full p-3 border rounded-md text-gray-700 border-gray-300 focus:ring-blue-500"
                      type="number"
                      required
                      max="50"
                      onChange={(event) => setjobExperience(event.target.value)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-5 justify-end mt-4">
                  <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)} className="text-gray-700 hover:bg-gray-100">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loadingBar}
                    className="bg-[#a900e2] hover:bg-[#9b3abb] text-white"
                  >
                    {loadingBar ? (
                      <>
                        <Loader className="animate-spin mr-2" /> Generating Response
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddInterview;
