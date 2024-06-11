
class InitalizeClient {

    constructor(url){
        this.url = url
        this.userVerified = ""
        this.urlcheck = ""
    }

    connect(){
        this.userVerified = true
        this.urlcheck = `url is corr - ${this.url}`
    }

    db(){
        return [this.url ,'are' ,this.urlcheck]
    }

}

module.exports = InitalizeClient