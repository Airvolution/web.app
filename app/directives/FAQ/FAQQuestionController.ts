/// <reference path="../../../typings/tsd.d.ts" />

export = FAQQuestionController;

class FAQQuestionController {
    public question;
    public chev = 'DOWN';
    public userLoggedIn = false;

    public static $inject = ['$sanitize', 'APIService', 'preferencesService'];
    constructor(private $sanitize, private APIService, private preferencesService) {
    };

    public toggleChevron() {
        //var image = angular.element('#img_' + this.question.id);


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
        this.preferencesService.loadUserDefaults().then((userPreferences) => {
            this.userLoggedIn = true;
        }, (error) => {
            this.userLoggedIn = false;

            alert("Error: You must be logged in.");

            // Exits if user is not logged in.
            return;
        });

        var review = {
            questionId: this.question.id,
            score: 0
        };

        if(direction == 'up') {

            review.score = 2;
            angular.element('#' + this.question.id + '_upVote').css('color', 'green');
            angular.element('#' + this.question.id + '_downVote').css('color', 'black');
            this.APIService.PostFaqUserReview(review).then((data)=>{
            });
        }
        else if(direction == 'down') {

            review.score = 1;
            angular.element('#' + this.question.id + '_upVote').css('color', 'black');
            angular.element('#' + this.question.id + '_downVote').css('color', 'red');
            this.APIService.PostFaqUserReview(review).then((data)=>{
            });
        }
    };
};
