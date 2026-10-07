import React, { useState } from 'react';
import { Header } from './components/Header';
import { Step1Category } from './components/Step1Category';
import { Step2Upload } from './components/Step2Upload';
import { Step3Generate } from './components/Step3Generate';
import { AdvanceModelSelectionPage } from './components/AdvanceModelSelectionPage';
import { AdvanceHubPage } from './components/AdvanceHubPage';
import { AdvanceToolView } from './components/AdvanceToolView';
import { CategoryId, WizardStep, WizardStatus, AdvanceModel, AdvanceStudioCategory } from './types';
import { FeatureOption } from './data/constants';

export default function App() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [status, setStatus] = useState<WizardStatus>('wizard');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);

  // Selected tool inside Advance Mode Studio
  const [advanceCategory, setAdvanceCategory] = useState<AdvanceStudioCategory | null>(null);

  // Custom generated look from Advance Mode
  const [currentLookImage, setCurrentLookImage] = useState<string | null>(null);
  const [currentModelName, setCurrentModelName] = useState<string | null>(null);
  const [isFromAdvanceMode, setIsFromAdvanceMode] = useState<boolean>(false);
  const [historyFromDirectResult, setHistoryFromDirectResult] = useState<boolean>(false);

  // Step 1: Category Selection
  const handleSelectCategory = (category: CategoryId) => {
    setSelectedCategory(category);
    setCurrentLookImage(null);
    setCurrentModelName(null);
    setIsFromAdvanceMode(false);
    setHistoryFromDirectResult(false);
  };

  // Step 2: Image Upload
  const handleImageSelected = (imageUri: string, name: string) => {
    setUploadedImage(imageUri);
    setUploadedImageName(name);
    setCurrentLookImage(null);
    setCurrentModelName(null);
    setIsFromAdvanceMode(false);
    setHistoryFromDirectResult(false);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setUploadedImageName(null);
    setCurrentLookImage(null);
    setCurrentModelName(null);
    setIsFromAdvanceMode(false);
    setHistoryFromDirectResult(false);
  };

  // Direct Generate from Step 2
  const handleDirectGenerate = () => {
    if (uploadedImage && selectedCategory) {
      setCurrentStep(3);
      handleGenerate();
    } else if (uploadedImage) {
      setCurrentStep(3);
    }
  };

  // Navigation Logic
  const handleNextStep = () => {
    if (currentStep === 1 && selectedCategory) {
      setCurrentStep(2);
    } else if (currentStep === 2 && uploadedImage) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (status === 'advance_mode') {
      if (historyFromDirectResult) {
        setStatus('result');
        setAdvanceCategory(null);
        setHistoryFromDirectResult(false);
        return;
      }
      if (advanceCategory) {
        setAdvanceCategory(null);
        return;
      }
      setStatus('result');
      return;
    }

    if (status === 'result') {
      if (isFromAdvanceMode) {
        setStatus('advance_mode');
        setAdvanceCategory(null);
      } else {
        setStatus('wizard');
        setCurrentStep(2);
      }
      return;
    }

    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleGenerate = () => {
    setIsFromAdvanceMode(false);
    setHistoryFromDirectResult(false);
    setStatus('generating');
    setTimeout(() => {
      setStatus('result');
    }, 2000);
  };

  const handleOpenAdvanceMode = () => {
    setAdvanceCategory(null);
    setHistoryFromDirectResult(false);
    setStatus('advance_mode');
  };

  const handleOpenHistoryDirectly = () => {
    if (!selectedCategory) {
      setSelectedCategory('saree');
    }
    setHistoryFromDirectResult(true);
    setStatus('advance_mode');
    setAdvanceCategory('history');
  };

  const handleApplyAdvanceModelAndGenerate = (
    model: AdvanceModel,
    feature: FeatureOption,
    options: {
      background: string;
      pose: string;
      lighting: string;
      aspectRatio: string;
      customPrompt: string;
    }
  ) => {
    setCurrentLookImage(feature.image || model.image);
    setCurrentModelName(`${model.name} (${feature.label})`);
    setIsFromAdvanceMode(true);
    setStatus('generating');

    setTimeout(() => {
      setStatus('result');
    }, 2000);
  };

  const handleReset = () => {
    setIsFromAdvanceMode(false);
    setStatus('wizard');
    setCurrentStep(1);
    setSelectedCategory(null);
    setUploadedImage(null);
    setUploadedImageName(null);
    setCurrentLookImage(null);
    setCurrentModelName(null);
  };

  const canGoBack =
    (currentStep === 2 && status === 'wizard') ||
    status === 'advance_mode';

  return (
    <div className="min-h-screen bg-neutral-100/70 flex flex-col items-center justify-start sm:py-8 sm:px-6 selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      {/* Ambient Glow for Desktop View */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 blur-[160px] pointer-events-none -z-10" />

      {/* Main Workspace Container */}
      <main className="w-full max-w-5xl bg-white min-h-screen sm:min-h-[640px] sm:rounded-3xl shadow-xl sm:border border-neutral-200/80 overflow-hidden flex flex-col relative pb-3 sm:pb-6">
        {/* Top Header with brand mark and back button */}
        <Header
          currentStep={currentStep}
          status={status}
          isAdvanceMode={status === 'advance_mode' || (status === 'result' && isFromAdvanceMode)}
          onBack={handleBack}
          canGoBack={canGoBack}
          onOpenHistory={handleOpenHistoryDirectly}
        />

        {/* Wizard Step Content */}
        <div className="flex-1 flex flex-col justify-start">
          {currentStep === 1 && status === 'wizard' && (
            <Step1Category
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              onNext={handleNextStep}
            />
          )}

          {currentStep === 2 && status === 'wizard' && (
            <Step2Upload
              uploadedImage={uploadedImage}
              uploadedImageName={uploadedImageName}
              selectedCategory={selectedCategory}
              onImageSelected={handleImageSelected}
              onClearImage={handleClearImage}
              onDirectGenerate={handleDirectGenerate}
              onBack={handleBack}
            />
          )}

          {(currentStep === 3 || status === 'generating' || status === 'result') &&
            selectedCategory &&
            uploadedImage && (
              <Step3Generate
                selectedCategory={selectedCategory}
                uploadedImage={uploadedImage}
                uploadedImageName={uploadedImageName}
                status={status}
                currentLookImage={currentLookImage}
                currentModelName={currentModelName}
                isFromAdvanceMode={isFromAdvanceMode}
                onStartGeneration={handleGenerate}
                onReset={handleReset}
                onBackToUpload={() => setCurrentStep(2)}
                onOpenAdvanceMode={handleOpenAdvanceMode}
                onBackToAdvanceStudio={() => {
                  setStatus('advance_mode');
                  setAdvanceCategory(null);
                }}
                onOpenHistory={handleOpenHistoryDirectly}
              />
            )}

          {status === 'advance_mode' && selectedCategory && (
            <>
              {advanceCategory === null && (
                <AdvanceHubPage
                  onSelectCategory={(cat) => setAdvanceCategory(cat)}
                  onBackToResult={() => setStatus('result')}
                />
              )}

              {(advanceCategory === 'garment' || advanceCategory === 'models') && (
                <AdvanceModelSelectionPage
                  selectedCategory={selectedCategory}
                  uploadedImage={uploadedImage || ''}
                  uploadedImageName={uploadedImageName}
                  onBackToResult={() => setAdvanceCategory(null)}
                  onApplyModelAndGenerate={handleApplyAdvanceModelAndGenerate}
                />
              )}

              {advanceCategory !== null &&
                advanceCategory !== 'garment' &&
                advanceCategory !== 'models' && (
                  <AdvanceToolView
                    category={advanceCategory}
                    uploadedImage={uploadedImage}
                    uploadedImageName={uploadedImageName}
                    currentLookImage={currentLookImage}
                    currentModelName={currentModelName}
                    onBackToHub={() => {
                      if (historyFromDirectResult) {
                        if (uploadedImage && (currentLookImage || currentModelName)) {
                          setStatus('result');
                        } else {
                          setStatus('wizard');
                        }
                        setAdvanceCategory(null);
                        setHistoryFromDirectResult(false);
                      } else {
                        setAdvanceCategory(null);
                      }
                    }}
                    onApplyAndGenerate={(img, title) => {
                      setCurrentLookImage(img);
                      setCurrentModelName(title);
                      setStatus('generating');
                      setTimeout(() => setStatus('result'), 2000);
                    }}
                  />
                )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
