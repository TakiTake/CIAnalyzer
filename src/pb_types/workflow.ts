/* eslint-disable */
export const protobufPackage = "schema";

export interface PbWorkflowReport {
  service: string;
  workflowId: string;
  workflowRunId: string;
  buildNumber: number;
  workflowName: string;
  createdAt: Date | undefined;
  trigger: string;
  /** 'SUCCESS' | 'FAILURE' | 'ABORTED' | 'OTHER' */
  status: string;
  repository: string;
  headSha: string;
  branch: string;
  tag: string;
  startedAt: Date | undefined;
  completedAt: Date | undefined;
  workflowDurationSec: number;
  sumJobsDurationSec: number;
  queuedDurationSec: number;
  /** 0 | 1 */
  successCount: number;
  jobs: PbJobReport[];
  parameters: PbJobParameter[];
  commitMessage: string;
  actor: string;
  url: string;
}

export interface PbJobReport {
  workflowRunId: string;
  buildNumber: number | undefined;
  jobId: string;
  jobName: string;
  /** 'SUCCESS' | 'FAILURE' | 'ABORTED' | 'OTHER' */
  status: string;
  startedAt: Date | undefined;
  completedAt: Date | undefined;
  jobDurationSec: number;
  sumStepsDurationSec: number;
  steps: PbStepReport[];
  url: string;
  executorClass: string;
  executorType: string;
  executorName: string;
}

export interface PbStepReport {
  name: string;
  /** 'SUCCESS' | 'FAILURE' | 'ABORTED' | 'OTHER' */
  status: string;
  number: number;
  startedAt: Date | undefined;
  completedAt: Date | undefined;
  stepDurationSec: number;
}

export interface PbJobParameter {
  name: string;
  value: string;
}

export interface PbWorkflowParams {
  workflowId: string;
  workflowRunId: string;
  buildNumber: number;
  workflowName: string;
}
