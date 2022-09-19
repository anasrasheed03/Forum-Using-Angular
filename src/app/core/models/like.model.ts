export interface Like {
    id: number;
    postId: number;
    createdBy: string;
    createdAt: string;
    activeInd: number;
    modifiedAt?: string;
  }