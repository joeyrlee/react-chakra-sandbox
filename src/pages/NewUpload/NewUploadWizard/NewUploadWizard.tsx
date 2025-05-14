import { Box, Collapse, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps } from "@chakra-ui/react"
import DemoForm from "./DataSourceForm/DataSourceForm"
import { useState } from "react";
import { DataSource } from "../../../models/DataSources/types";

const steps = [
  { title: 'Select data source' },
  { title: 'Do other thing' },
  { title: 'Third step' },
  { title: 'Final step' },
]

export default function NewUploadWizard() {
  const [dataSource, setDataSource] = useState<DataSource['id'] | null>(null);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleStepClick = (index: number) => {
    // some validation logic (eg can't move beyond completed steps) would go here
    setActiveStep(index);
  }

  const handleSubmitDataSource = (dataSource: string, nextStepNumber: number) => {
    setDataSource(dataSource);
    setActiveStep(nextStepNumber);
  }

  /**
   * With Collapse components, contents (pre-)render even when not visible - this can be good in that
   * it allows for faster movement between steps, pre-fetching any necessary data so it's ready ahead of time, etc. 
   * but similarly can be a performance bottlenecks for many/non-trivialforms (due to larger JS chunk sizes and
   * potential for UI lag). An alternate - or hybrid - approach would be to dynamically import the form components
   * when - or just before - needed (ie conditional rendering - see example implementation with UploadTaskStatuses
   * in the UploadsTable), else possibly using an advanced rendering model where you render a sliding window of steps
   * where only the previous, current, and next step are rendered to minimize load on the UI thread while
   * getting all of the other aforementioned benefits.
   */

  return (
    <Box px={[0, 0, 12, 32, 48, 64]}>
      <Stepper size='lg' index={activeStep} orientation='vertical' minHeight="275px">
        {steps.map((step, index) => (
          <Step key={index} onClick={() => handleStepClick(index)}>
            <StepIndicator as="button">
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle pt={2} pl={1}>{step.title}</StepTitle>
              {activeStep !== index && <StepDescription pl={1}>Dynamic form {index} description</StepDescription>}
              <Collapse in={activeStep === index} transition={{ exit: { duration: .4 }, enter: { duration: .4 } }}>
                {/* same form reused to create multiple instances for simplicity - in a real app forms would, of course,
                    be distinct or else parameterized/programmatically constructed from server-driven schemas */}
                <DemoForm
                  dataSource={dataSource}
                  formStep={index}
                  handleGoBack={() => setActiveStep(index > 0 ? index - 1 : index)}
                  handleSubmitDataSource={(val) => 
                    handleSubmitDataSource(val, (index < (steps.length - 1) ? index + 1 : index))
                  }
                />
              </Collapse>
            </Box>

            <StepSeparator sx={{ top: '50px !important' }} />
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
