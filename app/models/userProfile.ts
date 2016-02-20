///<reference path='../../typings/tsd.d.ts'/>

export = UserProfile;

class UserProfile {

    constructor(
        public name,
        public involvement,
        public linkedInUrl,
        public githubUrl,
        public picturePath
    ) {
    };
}
