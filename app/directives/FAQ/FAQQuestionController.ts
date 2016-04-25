/// <reference path="../../../typings/tsd.d.ts" />

export = FAQQuestionController;

class FAQQuestionController {
    public question;
    public userId = undefined;
    public userReviewColor = 'black';

    public static $inject = ['$sanitize', 'APIService', 'preferencesService', '$state', 'AuthService'];
    constructor(private $sanitize, private APIService, private preferencesService, private $state, private authService) {

        this.question.chevron = 'DOWN';

        this.APIService.getUserProfile().then((userProfile)=> {
            if(userProfile && userProfile.id != undefined) {
                this.userId = userProfile.id;

                var score = this.getMyQuestionReivewScore();
                if(score == 1) {
                    this.userReviewColor = 'green';
                }else if(score == -1) {
                    this.userReviewColor = 'red';
                }
            }
        });
    };

    public toggleChevron() {
        if(this.question.chevron == 'DOWN') {
            this.question.chevron = 'UP';

            // Increment view count.
            this.APIService.PostFaqViewCount(this.question.id).then((data)=>{
            }, (error) => {
            });

        } else {
            this.question.chevron = 'DOWN';
        }
    };

    public vote(direction) {

        // Check if user is logged in.
        if (!this.authService.authentication.isAuth) {
            var errorModal = this.$state.get('modal.error');
            errorModal.message = "You must be logged in to access this part of the application";
            errorModal.redirectMessage = "Login";
            errorModal.redirectState = 'modal.login';

            this.$state.go('modal.error');

            return;
        }

        var review = {
            questionId: this.question.id,
            score: 0
        };

        if(direction == 'up') {

            if(this.userReviewColor == 'green') {
                review.score = 0;
                this.userReviewColor = 'black';
            }
            else {
                review.score = 1;
                this.userReviewColor = 'green';
            }
            this.APIService.PostFaqUserReview(review).then((data)=>{
            });
        }
        else if(direction == 'down') {

            if(this.userReviewColor == 'red') {
                review.score = 0;
                this.userReviewColor = 'black';
            }
            else {
                review.score = -1;
                this.userReviewColor = 'red';
            }

            this.APIService.PostFaqUserReview(review).then((data)=>{
            });
        }
    };

    public getMyQuestionReivewScore(){
        for(var i = 0; i < this.question.userReviews.length; i++) {
            if (this.question.userReviews[i].user_Id == this.userId) {
                return this.question.userReviews[i].userReviewScore;
            }
        }
    };
}
