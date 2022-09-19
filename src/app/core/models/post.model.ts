export interface Post {
  id:number;
  title: string;
  body: string;
  createdAt: string;
  createdBy:string;
  modifiedAt:string;
  activeInd:number;
  totalLike:number;
  likeId?:number;
  liked: boolean;

}
