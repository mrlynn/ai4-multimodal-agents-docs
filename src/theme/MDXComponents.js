import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Link from "@site/src/components/Link";
import Screenshot from "@site/src/components/Screenshot";
import WorkshopExercise, { ExerciseStep, ExerciseValidation } from "@site/src/components/WorkshopExercise";
import CodeBlock, { TerminalCommand } from "@site/src/components/CodeBlock";
import ProgressTracker, { StepIndicator } from "@site/src/components/ProgressTracker";
import InteractiveDemo, { ConfigBuilder, ServiceTester } from "@site/src/components/InteractiveDemo";
import Quiz, { QuickCheck } from "@site/src/components/Quiz";
import EmbeddingTester, { EmbeddingVisualizer } from "@site/src/components/EmbeddingTester";
import QuickEmbeddingTest from "@site/src/components/QuickEmbeddingTest";
import WorkshopTransition, { SlideRecap, InstructorNotes, QRCodeAccess } from "@site/src/components/WorkshopTransition";
import WorkshopFeedback from "@site/src/components/WorkshopFeedback";
import WorkshopResources from "@site/src/components/WorkshopResources";
import LiveStatusBadge, { 
  StatusDot, 
  SystemHealthDashboard,
  CodespaceStatusBadge,
  DockerServicesStatusBadge,
  MongoDBAtlasStatusBadge,
  VoyageAIStatusBadge,
  WorkflowTestBadge
} from "@site/src/components/LiveStatusBadge";
import ExplainableCodeBlock, { WorkshopCodeBlock } from "@site/src/components/ExplainableCodeBlock";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Link,
  Screenshot,
  WorkshopExercise,
  ExerciseStep,
  ExerciseValidation,
  CodeBlock,
  TerminalCommand,
  ProgressTracker,
  StepIndicator,
  InteractiveDemo,
  ConfigBuilder,
  ServiceTester,
  Quiz,
  QuickCheck,
  EmbeddingTester,
  EmbeddingVisualizer,
  QuickEmbeddingTest,
  WorkshopTransition,
  SlideRecap,
  InstructorNotes,
  QRCodeAccess,
  WorkshopFeedback,
  WorkshopResources,
  LiveStatusBadge,
  StatusDot,
  SystemHealthDashboard,
  CodespaceStatusBadge,
  DockerServicesStatusBadge,
  MongoDBAtlasStatusBadge,
  VoyageAIStatusBadge,
  WorkflowTestBadge,
  ExplainableCodeBlock,
  WorkshopCodeBlock
};