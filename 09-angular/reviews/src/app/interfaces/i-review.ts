export interface IReview {
    id: number;
    reviewerID: string;
    asin: string;
    reviewerName: string;
    helpful: string;
    reviewText: string;
    overall: number;
    summary: string;
    unixReviewTime: number;
    reviewTime: string;
    created_at?: string;
}
