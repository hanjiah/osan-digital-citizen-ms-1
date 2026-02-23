/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Monitor, Map, RotateCcw, ChevronRight, Sparkles } from 'lucide-react';

type Step = 1 | 2 | 3 | 'result';

interface Result {
  animal: string;
  name: string;
  desc: string;
}

const resultMap: Record<string, Result> = {
  '매콤영상시청계획형': { animal: '🐧', name: '펭귄 그룹', desc: '철저한 계획 속에 매운맛을 즐기며 영상을 감상하는 당신은 완벽주의 관찰자!' },
  '매콤영상시청즉흥형': { animal: '🐤', name: '병아리 그룹', desc: '매운맛의 열정과 영상의 즐거움을 즉흥적으로 만끽하는 자유로운 영혼입니다.' },
  '매콤직접활동계획형': { animal: '🐰', name: '토끼 그룹', desc: '계획된 일정대로 몸을 움직이며 에너지를 발산하는 열정적인 활동가형!' },
  '매콤직접활동즉흥형': { animal: '🐷', name: '돼지 그룹', desc: '그때그때 기분에 따라 매운맛과 활동을 즐기는 즐거운 탐험가입니다.' },
  '담백영상시청계획형': { animal: '🐘', name: '코끼리 그룹', desc: '차분하게 계획을 세워 영상을 보며 여유를 즐기는 지혜로운 사색가!' },
  '담백영상시청즉흥형': { animal: '🐒', name: '원숭이 그룹', desc: '담백한 일상 속에서 흥미로운 영상을 찾아다니는 호기심 많은 유형입니다.' },
  '담백직접활동계획형': { animal: '🐱', name: '고양이 그룹', desc: '담백하고 깔끔하게, 정해진 루틴대로 움직이는 것을 선호하는 규칙적인 분이군요.' },
  '담백직접활동즉흥형': { animal: '🐸', name: '개구리 그룹', desc: '속 편한 담백함과 자유로운 활동을 동시에 즐기는 긍정적인 즉흥형 활동가!' }
};

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [selections, setSelections] = useState({
    step1: '',
    step2: '',
    step3: ''
  });

  const handleNext = (value: string) => {
    const currentStepKey = `step${step}` as keyof typeof selections;
    setSelections(prev => ({ ...prev, [currentStepKey]: value }));

    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep('result');
  };

  const resetGame = () => {
    setStep(1);
    setSelections({ step1: '', step2: '', step3: '' });
  };

  const getResult = () => {
    const key = selections.step1 + selections.step2 + selections.step3;
    return resultMap[key] || { animal: '❓', name: '알 수 없음', desc: '데이터가 부족합니다.' };
  };

  const progress = step === 'result' ? 100 : ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-blue-50">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-white text-center relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <h1 className="text-3xl font-bold tracking-tight">데이터 수집 게임</h1>
            <p className="text-blue-100 mt-2 font-medium">3가지 질문을 통해 나의 '데이터 지도'를 완성해보세요!</p>
          </motion.div>
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2.5">
          <motion.div 
            className="bg-yellow-400 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6">
                  <Utensils size={16} />
                  <span>STEP 1</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">데이터 수집 1단계 - 입맛</h2>
                <p className="text-gray-500 mb-10">여러분의 점심 메뉴 취향은 어떤가요?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ChoiceButton 
                    icon="🌶️" 
                    title="매콤한 음식" 
                    desc="스트레스 풀리는 매운맛" 
                    color="red"
                    onClick={() => handleNext('매콤')}
                  />
                  <ChoiceButton 
                    icon="🥗" 
                    title="담백한 음식" 
                    desc="속이 편안한 순한맛" 
                    color="green"
                    onClick={() => handleNext('담백')}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6">
                  <Monitor size={16} />
                  <span>STEP 2</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">데이터 수집 2단계 - 여가 시간</h2>
                <p className="text-gray-500 mb-10">주말에 시간이 생기면 무엇을 하시겠습니까?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ChoiceButton 
                    icon="🎬" 
                    title="영상 시청" 
                    desc="유튜브, 넷플릭스 정주행" 
                    color="orange"
                    onClick={() => handleNext('영상시청')}
                  />
                  <ChoiceButton 
                    icon="👟" 
                    title="직접 활동" 
                    desc="게임 플레이, 운동, 산책" 
                    color="teal"
                    onClick={() => handleNext('직접활동')}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6">
                  <Map size={16} />
                  <span>STEP 3</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">데이터 수집 3단계 - 성향</h2>
                <p className="text-gray-500 mb-10">여행을 떠날 때 당신의 스타일은?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ChoiceButton 
                    icon="📅" 
                    title="계획적인 플랜" 
                    desc="분 단위 계획표, 맛집 예약 필수" 
                    color="indigo"
                    onClick={() => handleNext('계획형')}
                  />
                  <ChoiceButton 
                    icon="🎒" 
                    title="즉흥적인 즐거움" 
                    desc="발길 닿는 대로, 그곳이 곧 여행지" 
                    color="lime"
                    onClick={() => handleNext('즉흥형')}
                  />
                </div>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold mb-8 text-blue-800 flex items-center justify-center gap-2">
                  <Sparkles className="text-yellow-400" />
                  나의 데이터 지도 결과
                </h2>
                
                <div className="bg-blue-50/50 rounded-[2.5rem] p-10 mb-8 border-2 border-dashed border-blue-200 relative">
                  <motion.div 
                    initial={{ y: 10 }}
                    animate={{ y: -10 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    className="text-9xl mb-6"
                  >
                    {getResult().animal}
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">{getResult().name}</h3>
                  
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <Tag text={`#${selections.step1}`} />
                    <Tag text={`#${selections.step2 === '영상시청' ? '영상 시청' : '직접 활동'}`} />
                    <Tag text={`#${selections.step3}`} />
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed font-medium px-4">
                    {getResult().desc}
                  </p>
                </div>

                <button 
                  onClick={resetGame}
                  className="group w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-3 active:scale-95"
                >
                  <RotateCcw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                  다시 테스트하기
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({ icon, title, desc, color, onClick }: { 
  icon: string, 
  title: string, 
  desc: string, 
  color: string, 
  onClick: () => void 
}) {
  const colorClasses: Record<string, string> = {
    red: "bg-red-50 hover:border-red-400 text-red-700",
    green: "bg-green-50 hover:border-green-400 text-green-700",
    orange: "bg-orange-50 hover:border-orange-400 text-orange-700",
    teal: "bg-teal-50 hover:border-teal-400 text-teal-700",
    indigo: "bg-indigo-50 hover:border-indigo-400 text-indigo-700",
    lime: "bg-lime-50 hover:border-lime-400 text-lime-700",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group relative p-8 rounded-3xl border-2 border-transparent transition-all text-left flex flex-col items-center sm:items-start ${colorClasses[color]}`}
    >
      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="font-bold text-xl mb-1">{title}</div>
      <p className="text-sm opacity-70 font-medium">{desc}</p>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={20} />
      </div>
    </motion.button>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-5 py-2.5 bg-white rounded-full shadow-sm font-bold text-gray-600 border border-gray-100">
      {text}
    </span>
  );
}
