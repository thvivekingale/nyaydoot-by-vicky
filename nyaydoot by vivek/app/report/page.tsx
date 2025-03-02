"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Camera, FileUp, MapPin, Shield, User, Eye, EyeOff, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import LawyerSelector from "@/components/lawyer-selector"

export default function ReportPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showLawyerSelector, setShowLawyerSelector] = useState(false)
  const [formData, setFormData] = useState({
    incidentType: "",
    location: "",
    date: "",
    description: "",
    peopleInvolved: "",
    evidenceFiles: [],
  })

  const handleNext = () => {
    const nextStep = step + 1
    setStep(nextStep)
    setProgress(nextStep * 25)
  }

  const handlePrevious = () => {
    const prevStep = step - 1
    setStep(prevStep)
    setProgress(prevStep * 25)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Report submitted successfully",
      description: "Your report has been submitted and will be reviewed shortly.",
    })
    // In a real app, we would submit the form data to the server here
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData({
        ...formData,
        evidenceFiles: [...formData.evidenceFiles, ...filesArray],
      })
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = [...formData.evidenceFiles]
    updatedFiles.splice(index, 1)
    setFormData({
      ...formData,
      evidenceFiles: updatedFiles,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Report an Incident</h1>
            <p className="text-lg text-muted-foreground">
              Document and report corruption, police misconduct, or abuse securely and confidentially.
            </p>
          </div>

          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Incident Report Form</CardTitle>
                  <CardDescription>Please provide as much detail as possible</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="anonymous-mode" className="text-sm font-medium">
                    Anonymous Mode
                  </Label>
                  <Switch id="anonymous-mode" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                  {isAnonymous ? (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>

            <div className="px-6">
              <div className="mb-6">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>Basic Details</span>
                  <span>Evidence</span>
                  <span>Review</span>
                  <span>Submit</span>
                </div>
              </div>

              <Separator className="mb-6" />
            </div>

            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 animate-in"
                  >
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="incident-type" className="text-base">
                          Type of Incident
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 inline-block ml-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-80">
                                  Select the category that best describes the incident you're reporting
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <Select
                          value={formData.incidentType}
                          onValueChange={(value) => setFormData({ ...formData, incidentType: value })}
                        >
                          <SelectTrigger id="incident-type" className="w-full mt-1">
                            <SelectValue placeholder="Select incident type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bribery">Bribery/Corruption</SelectItem>
                            <SelectItem value="police-misconduct">Police Misconduct</SelectItem>
                            <SelectItem value="harassment">Harassment</SelectItem>
                            <SelectItem value="abuse-of-power">Abuse of Power</SelectItem>
                            <SelectItem value="fraud">Fraud</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location" className="text-base">
                            Location
                            <MapPin className="h-4 w-4 inline-block ml-2 text-muted-foreground" />
                          </Label>
                          <Input
                            id="location"
                            placeholder="Enter location of incident"
                            className="mt-1"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            You can also enable GPS to automatically detect your location
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="date" className="text-base">
                            Date and Time of Incident
                          </Label>
                          <Input
                            id="date"
                            type="datetime-local"
                            className="mt-1"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-base">
                          Description of Incident
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Provide a detailed description of what happened..."
                          className="mt-1 min-h-[120px]"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="people-involved" className="text-base">
                          People Involved
                        </Label>
                        <Textarea
                          id="people-involved"
                          placeholder="List names, designations, or descriptions of people involved..."
                          className="mt-1"
                          value={formData.peopleInvolved}
                          onChange={(e) => setFormData({ ...formData, peopleInvolved: e.target.value })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 animate-in"
                  >
                    <div>
                      <h3 className="text-lg font-medium mb-4">Upload Evidence</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Supports images, videos, audio, and documents (up to 50MB per file)
                        </p>
                        <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                        <div className="flex gap-4 justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            Browse Files
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              // In a real app, this would trigger the camera
                              toast({
                                title: "Camera activated",
                                description: "You can now take a photo or record a video.",
                              })
                            }}
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Take Photo/Video
                          </Button>
                        </div>
                      </div>

                      {formData.evidenceFiles.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium mb-2">Uploaded Files ({formData.evidenceFiles.length})</h4>
                          <div className="space-y-2">
                            {formData.evidenceFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                                <div className="flex items-center">
                                  <FileUp className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="h-8 w-8 p-0"
                                >
                                  &times;
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="need-lawyer"
                            checked={showLawyerSelector}
                            onCheckedChange={setShowLawyerSelector}
                          />
                          <Label htmlFor="need-lawyer" className="font-medium">
                            I need legal assistance with this case
                          </Label>
                        </div>

                        {showLawyerSelector && (
                          <div className="mt-4 p-4 border rounded-md bg-muted/50">
                            <h4 className="font-medium mb-2">Connect with a Lawyer</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              We can connect you with qualified lawyers who specialize in cases like yours.
                            </p>
                            <LawyerSelector />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 animate-in"
                  >
                    <div>
                      <h3 className="text-lg font-medium mb-4">Review Your Report</h3>
                      <div className="space-y-4 bg-muted/30 p-4 rounded-md">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Type of Incident</h4>
                          <p>{formData.incidentType || "Not specified"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
                          <p>{formData.location || "Not specified"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Date and Time</h4>
                          <p>{formData.date || "Not specified"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Description</h4>
                          <p>{formData.description || "Not specified"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">People Involved</h4>
                          <p>{formData.peopleInvolved || "Not specified"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Evidence Files</h4>
                          <p>
                            {formData.evidenceFiles.length > 0
                              ? `${formData.evidenceFiles.length} files uploaded`
                              : "No files uploaded"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Reporting Mode</h4>
                          <p>{isAnonymous ? "Anonymous" : "Identified"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">Legal Assistance</h4>
                          <p>{showLawyerSelector ? "Requested" : "Not requested"}</p>
                        </div>
                      </div>

                      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                          <div>
                            <h4 className="font-medium text-yellow-800">Important Notice</h4>
                            <p className="text-sm text-yellow-700">
                              By submitting this report, you confirm that all information provided is true to the best
                              of your knowledge. False reporting may have legal consequences.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 animate-in"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <Shield className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Ready to Submit Your Report</h3>
                      <p className="text-muted-foreground mb-6">
                        Your report will be securely submitted and reviewed by our team.
                        {isAnonymous
                          ? " Your identity will remain anonymous."
                          : " You will receive updates on your registered email or phone."}
                      </p>

                      {!isAnonymous && (
                        <div className="mb-6 max-w-md mx-auto">
                          <div className="flex items-center space-x-4 bg-muted p-4 rounded-md">
                            <User className="h-10 w-10 text-primary" />
                            <div className="text-left">
                              <p className="font-medium">Reporting as:</p>
                              <p className="text-muted-foreground">user@example.com</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button type="submit" size="lg" className="w-full md:w-auto">
                        Submit Report
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {step < 4 && (
                <Button type="button" className="ml-auto" onClick={handleNext}>
                  Next
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

