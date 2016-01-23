///<reference path="../typings/tsd.d.ts" />

export = Globals;

const LOCAL_PORT = 2307;
class Globals {

    static get api_base(): string {
        return 'http://localhost:' + LOCAL_PORT;
    }
}