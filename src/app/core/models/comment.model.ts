// import { Profile } from './profile.model';

export interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  createdBy: string;
  activeInd: number;
  modifiedAt?: string;
  postId: number;
}
