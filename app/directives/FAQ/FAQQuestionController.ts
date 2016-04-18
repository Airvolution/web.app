/// <reference path="../../../typings/tsd.d.ts" />

export = FAQQuestionController;

class FAQQuestionController {
    public question;
    public chev = 'DOWN';
    public userId = undefined;
    public userReviewColor = 'black';

    public static $inject = ['$sanitize', 'APIService', 'preferencesService'];
    constructor(private $sanitize, private APIService, private preferencesService) {

        this.APIService.getUserProfile().then((userProfile)=> {
            if(userProfile.id != undefined) {
                this.userId = userProfile.id;

                var score = this.getMyQuestionReivewScore();
                if(score == 1) {
                    this.userReviewColor = 'green';
                }
                else if(score == -1) {
                    this.userReviewColor = 'red';
                }
            }
        });
    };

    public toggleChevron() {
        if(this.chev == 'DOWN') {
            this.chev = 'UP';

            // Increment view count.

            this.APIService.PostFaqViewCount(this.question.id).then((data)=>{

            }, (error) => {
            });

        }
        else {
            this.chev = 'DOWN';
        }
    };

    public vote(direction) {

        // Check if user is logged in.
        if(this.userId == undefined) {
            alert('You must be logged in to make a user review!');
            return;
        }

        var review = {
            questionId: this.question.id,
            score: 0
        };

        if(direction == 'up') {

            review.score = 1;
            //angular.element('#' + this.question.id + '_downVote').addClass('black');
            this.userReviewColor = 'green';
            this.APIService.PostFaqUserReview(review).then((data)=>{
            });
        }
        else if(direction == 'down') {

            review.score = -1;
            //angular.element('#' + this.question.id + '_upVote').addClass('black');
            this.userReviewColor = 'red';
            this.APIService.PostFaqUserReview(review).then((data)=>{
            });
        }
    };

    public getMyQuestionReivewScore()
    {
        for(var i = 0; i < this.question.userReviews.length; i++) {
            if(this.question.userReviews[i].user_Id == this.userId) {
                return this.question.userReviews[i].userReviewScore;
            }
        }
    };
};
