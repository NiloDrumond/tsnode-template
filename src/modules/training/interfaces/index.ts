type TrainingType = 'agility';
type AgilityTrainingType = 'canifis';

interface BaseTraining {
  type: TrainingType;
}

export interface AgilityTraining extends BaseTraining {
  type: 'agility';
  subType: AgilityTrainingType;
}

export type Training = AgilityTraining;
