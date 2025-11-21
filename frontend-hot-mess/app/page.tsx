"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCwIcon, SparklesIcon } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "How many times did you hit snooze this morning?",
    options: [
      { text: "0 (I'm a morning person!)", points: 0 },
      { text: "1-2 times", points: 1 },
      { text: "3-5 times", points: 2 },
      { text: "Lost count...", points: 3 },
    ],
  },
  {
    id: 2,
    question: "When did you last do laundry?",
    options: [
      { text: "Yesterday", points: 0 },
      { text: "This week", points: 1 },
      { text: "Last week... maybe?", points: 2 },
      { text: "I'm wearing inside-out clothes", points: 3 },
    ],
  },
  {
    id: 3,
    question: "What's for dinner tonight?",
    options: [
      { text: "Home-cooked meal", points: 0 },
      { text: "Takeout", points: 1 },
      { text: "Cereal or snacks", points: 2 },
      { text: "Dinner? What's that?", points: 3 },
    ],
  },
  {
    id: 4,
    question: "How organized is your workspace?",
    options: [
      { text: "Spotless and tidy", points: 0 },
      { text: "Organized chaos", points: 1 },
      { text: "Pure chaos", points: 2 },
      { text: "What workspace? Can't find it", points: 3 },
    ],
  },
  {
    id: 5,
    question: "How many unread messages do you have?",
    options: [
      { text: "None, inbox zero baby!", points: 0 },
      { text: "Under 20", points: 1 },
      { text: "50-100", points: 2 },
      { text: "999+ (I gave up)", points: 3 },
    ],
  },
]

const getScoreMessage = (score: number) => {
  const maxScore = questions.length * 3
  const percentage = (score / maxScore) * 100

  if (percentage <= 20) {
    return {
      title: "✨ You're Doing Amazing!",
      message: "Wow, you've got your life together! Keep up the great work!",
      color: "text-[#533b4d]",
    }
  } else if (percentage <= 40) {
    return {
      title: "😊 Pretty Chill",
      message: "You're handling things well! Just a few minor hiccups here and there.",
      color: "text-[#533b4d]",
    }
  } else if (percentage <= 60) {
    return {
      title: "🤷 Moderate Hot Mess",
      message: "Things are a bit chaotic, but you're managing! Take a deep breath.",
      color: "text-[#f564a9]",
    }
  } else if (percentage <= 80) {
    return {
      title: "🔥 Certified Hot Mess",
      message: "Life's a bit messy right now, but that's okay! Tomorrow is a new day.",
      color: "text-[#f564a9]",
    }
  } else {
    return {
      title: "🌪️ Hurricane Hot Mess",
      message: "You're in full chaos mode! But hey, at least you're honest about it!",
      color: "text-[#f564a9]",
    }
  }
}

export default function HotMessScorer() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const totalScore = answers.reduce((sum, score) => sum + score, 0)
  const scoreResult = getScoreMessage(totalScore)

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fae3c6]">
      {/* Organic blob shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#faa4bd] rounded-[50%_60%_70%_40%] opacity-40 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#f564a9] rounded-[60%_40%_30%_70%] opacity-30 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#c1aba6] rounded-[40%_60%_60%_40%] opacity-40 blur-2xl" />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-[#faa4bd] rounded-[70%_30%_50%_50%] opacity-30 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {!showResult ? (
          <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm border-2 border-[#c1aba6] shadow-xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-[#533b4d] flex items-center gap-2">
                  <SparklesIcon className="w-8 h-8 text-[#f564a9]" />
                  Hot-Mess Scorer
                </h1>
                <span className="text-sm text-[#533b4d] bg-[#faa4bd] px-3 py-1 rounded-full">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <div className="w-full h-2 bg-[#c1aba6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#f564a9] transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#533b4d] text-balance">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-4 px-6 text-base border-2 border-[#c1aba6] hover:bg-[#faa4bd] hover:text-[#533b4d] hover:border-[#f564a9] transition-all bg-transparent"
                    onClick={() => handleAnswer(option.points)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm border-2 border-[#c1aba6] shadow-xl text-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-[#533b4d]">Your Hot-Mess Score</h1>

              <div className="py-8">
                <div className="inline-block bg-gradient-to-br from-[#f564a9] to-[#faa4bd] text-white text-7xl font-bold rounded-full w-40 h-40 flex items-center justify-center shadow-2xl">
                  {totalScore}
                </div>
                <p className="text-sm text-[#533b4d] mt-2">out of {questions.length * 3}</p>
              </div>

              <div className="space-y-4">
                <h2 className={`text-3xl font-bold ${scoreResult.color}`}>{scoreResult.title}</h2>
                <p className="text-lg text-[#533b4d] text-balance max-w-md mx-auto">{scoreResult.message}</p>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="mt-6 border-2 border-[#f564a9] text-[#533b4d] hover:bg-[#f564a9] hover:text-white bg-transparent"
                onClick={resetQuiz}
              >
                <RefreshCwIcon className="w-5 h-5 mr-2" />
                Take Quiz Again
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
